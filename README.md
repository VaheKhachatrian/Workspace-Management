Fullstack Test Task
This is a fullstack project built with Express.js (backend) and React (frontend), utilizing Redux Toolkit (RTK) and RTK Query for state management and data fetching. The UI is designed using Ant Design.

🚀 Getting Started
Prerequisites
Ensure you have the following installed on your machine:

Node.js (LTS version recommended)
npm (comes with Node.js)
📂 Project Structure
bash
Copy
Edit
/project-root
│── /backend     # Express.js backend
│── /frontend    # React frontend
│── package.json
│── README.md
⚙️ Installation
Clone the repository:

bash
Copy
Edit
git clone <repository-url>
cd project-root
Backend Setup
bash
Copy
Edit
cd backend
npm install
npm run dev
Backend Scripts (backend/package.json)
json
Copy
Edit
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm start
Frontend Scripts (frontend/package.json)
json
Copy
Edit
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
🔗 Technologies Used
Frontend:
React
Redux Toolkit (RTK)
RTK Query
Ant Design (UI Library)
Backend:
Express.js
Node.js
📌 Available Scripts
Backend
npm run dev - Runs the backend server in development mode.
npm start - Starts the backend server.
Frontend
npm start - Runs the frontend development server.
npm run build - Builds the app for production.
📝 API Endpoints
(Provide API details here if needed, e.g., authentication, CRUD operations)

✨ Features
React frontend with state management using Redux Toolkit & RTK Query.
Express.js backend with RESTful API.
UI components styled with Ant Design.
