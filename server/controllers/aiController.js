const Employee = require('../models/Employee');

// @desc    Get AI recommendation for an employee or all employees
// @route   POST /api/ai/recommend
// @access  Private
const getRecommendation = async (req, res, next) => {
  try {
    const { employeeId } = req.body;
    let employeeData;

    if (employeeId) {
      const employee = await Employee.findById(employeeId);
      if (!employee) {
        res.status(404);
        throw new Error('Employee not found');
      }
      employeeData = [employee];
    } else {
      employeeData = await Employee.find();
    }

    if (!employeeData || employeeData.length === 0) {
      res.status(400);
      throw new Error('No employee data available to analyze');
    }

    // Prepare prompt
    const prompt = `
      You are an expert HR AI assistant. Analyze the following employee data:
      ${JSON.stringify(employeeData, null, 2)}
      
      Based on the performance score, skills, and experience:
      1. If performance > 85, suggest promotion or advanced roles.
      2. If performance < 60, suggest an improvement plan.
      3. Identify missing skills or suggest training.
      4. Rank the employees if there are multiple.

      You MUST respond ONLY with a valid JSON object in this exact format:
      {
        "recommendation": "Overall recommendation summary...",
        "improvement": "Specific improvement points or training suggestions...",
        "ranking": [
          { "name": "Employee Name", "score": 90, "rank": 1 }
        ]
      }
      Do not include any markdown formatting like \`\`\`json or \`\`\`. Just return the raw JSON string.
    `;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'nvidia/nemotron-3-super-120b-a12b:free', // You can change this to google/gemini-2.5-flash or others available on OpenRouter
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenRouter API Error:', errorData);
      res.status(500);
      throw new Error('Failed to get recommendation from AI');
    }

    const data = await response.json();
    let aiResponse = data.choices[0].message.content.trim();
    
    // Clean up potential markdown formatting if the AI still included it
    if (aiResponse.startsWith('```json')) {
      aiResponse = aiResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (aiResponse.startsWith('```')) {
      aiResponse = aiResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    // Parse JSON safely
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(aiResponse);
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', aiResponse);
      // Fallback if AI didn't return valid JSON
      parsedResponse = {
        recommendation: aiResponse,
        improvement: "Failed to parse structured improvement data.",
        ranking: []
      };
    }

    res.json(parsedResponse);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRecommendation
};
