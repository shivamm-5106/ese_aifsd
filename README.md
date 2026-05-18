# Employee Performance and AI Recommendation System

## Project Overview
This project is a complete MERN stack application designed to manage employee performance and provide actionable AI-driven recommendations based on employee data (skills, experience, and performance scores). It features a secure authentication system, an aesthetic and dynamic UI using Tailwind CSS, and a powerful AI integration using OpenRouter API.

## Architecture
This application strictly follows the MVC (Model-View-Controller) architecture on the backend and a modular component-based architecture on the frontend.

### Backend (Node.js + Express + MongoDB)
- **Controllers**: Contains business logic (`authController.js`, `employeeController.js`, `aiController.js`).
- **Models**: Defines Mongoose schemas (`User.js`, `Employee.js`).
- **Routes**: Maps endpoints to controllers (`authRoutes.js`, `employeeRoutes.js`, `aiRoutes.js`).
- **Middleware**: Intercepts requests for authentication (`authMiddleware.js`) and error handling (`errorMiddleware.js`).
- **Config**: Database connection setup (`db.js`).

### Frontend (React + Vite + Tailwind CSS)
- **Pages**: Top-level views (`Login`, `Signup`, `Dashboard`, `AddEmployee`, `AIRecommendation`).
- **Components**: Reusable UI elements (`Navbar`, `ProtectedRoute`).
- **Context**: Global state management (`AuthContext.js`).

## API List
All protected routes require a valid JWT token in the `Authorization: Bearer <token>` header.

### Authentication (`/api/auth`)
- `POST /signup` - Register a new user. Returns JWT token.
- `POST /login` - Authenticate user. Returns JWT token.

### Employees (`/api/employees`)
- `GET /` - List all employees. (Protected)
- `POST /` - Add a new employee. (Protected)
- `GET /search?department=<name>` - Search employees by department. (Protected)
- `PUT /:id` - Update employee details. (Protected)
- `DELETE /:id` - Remove an employee. (Protected)

### AI Integration (`/api/ai`)
- `POST /recommend` - Analyze employee data and get a structured JSON recommendation (Performance ranking, promotion, and improvement plans). (Protected)

---

## Phase 7: Testing & Screenshots Guide

To secure maximum marks for your submission, follow these exact steps to capture your screenshots:

### 1. Database Setup (MongoDB)
1. Ensure your local MongoDB server is running on `mongodb://localhost:27017` (or update the `MONGO_URI` in `server/.env` to your Atlas URI).
2. Take a screenshot of your MongoDB Compass showing the newly created `employee-ai-db` database.

### 2. Postman Testing (Backend)
1. Open terminal and run `cd server` then `npm run dev` (Ensure you added `"dev": "nodemon server.js"` in package.json, otherwise run `node server.js`).
2. **Signup**: POST `http://localhost:5000/api/auth/signup` with JSON `{ "email": "test@test.com", "password": "password123" }`. Take a screenshot.
3. **Login**: POST `http://localhost:5000/api/auth/login`. Copy the `token` from the response. Take a screenshot.
4. **Add Employee**: POST `http://localhost:5000/api/employees`. Go to Headers -> Authorization -> Bearer Token (paste token). Body -> raw -> JSON:
   ```json
   {
     "name": "John Doe",
     "email": "john@company.com",
     "department": "Engineering",
     "skills": ["React", "Node.js"],
     "performanceScore": 95,
     "experience": 4
   }
   ```
   Take a screenshot of the successful insertion. Then try inserting the same email again to show the **Duplicate Email Error** screenshot.
5. **Search**: GET `http://localhost:5000/api/employees/search?department=Engineering` (with token). Take a screenshot.
6. **AI**: POST `http://localhost:5000/api/ai/recommend` (with token). Take a screenshot of the structured JSON response.

### 3. UI Testing (Frontend)
1. Open a new terminal, run `cd client` and then `npm run dev`.
2. Open `http://localhost:5173` in your browser.
3. Take screenshots of:
   - The modern Login/Signup page.
   - The Dashboard displaying the employee cards.
   - The Add Employee form.
   - The AI Recommendations page showing the generated insights.

---

## Phase 8: Deployment Guide

### Backend (Render)
1. Push your code to GitHub.
2. Go to [Render](https://render.com) and create a new **Web Service**.
3. Connect your repository. Set Root Directory to `server`.
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Add Environment Variables: `MONGO_URI` (Must be an Atlas URI, not localhost), `JWT_SECRET`, `OPENROUTER_API_KEY`.
7. Deploy.

### Frontend (Render or Vercel)
1. Go to Vercel (or Render Static Site).
2. Connect the same repository. Set Root Directory to `client`.
3. Framework Preset: Vite.
4. Add Environment Variable: Change the Axios base URL in your React code from `http://localhost:5000` to your deployed Render backend URL.
5. Deploy.

---

## Convert this to PDF
You can use a markdown-to-pdf converter, or open this file in VSCode, right-click, and select "Markdown PDF: Export (pdf)" if you have the extension installed. This will fulfill Phase 9 perfectly.
