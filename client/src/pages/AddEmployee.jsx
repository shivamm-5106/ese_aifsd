import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

const AddEmployee = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    skills: '',
    performanceScore: '',
    experience: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post(
        'http://localhost:5000/api/employees',
        {
          ...formData,
          performanceScore: Number(formData.performanceScore),
          experience: Number(formData.experience)
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add employee');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-indigo-600 px-6 py-8 text-white text-center">
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <UserPlus size={32} />
          </div>
          <h2 className="text-3xl font-bold">Onboard New Talent</h2>
          <p className="text-indigo-100 mt-2">Add an employee to the AI-powered HR platform</p>
        </div>

        <div className="p-8">
          {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-slate-50 focus:bg-white"
                  onChange={handleChange}
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-slate-50 focus:bg-white"
                  onChange={handleChange}
                  placeholder="jane@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Department</label>
                <input
                  type="text"
                  name="department"
                  required
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-slate-50 focus:bg-white"
                  onChange={handleChange}
                  placeholder="Engineering"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Experience (Years)</label>
                <input
                  type="number"
                  name="experience"
                  required
                  min="0"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-slate-50 focus:bg-white"
                  onChange={handleChange}
                  placeholder="5"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Performance Score (0-100)</label>
              <input
                type="number"
                name="performanceScore"
                required
                min="0"
                max="100"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-slate-50 focus:bg-white"
                onChange={handleChange}
                placeholder="85"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Skills (comma separated)</label>
              <textarea
                name="skills"
                required
                rows="3"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-slate-50 focus:bg-white resize-none"
                onChange={handleChange}
                placeholder="React, Node.js, Project Management"
              ></textarea>
            </div>

            <div className="pt-4 flex justify-end gap-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-md shadow-indigo-200 flex items-center gap-2"
              >
                <UserPlus size={18} /> Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
