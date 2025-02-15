# Quizo - Quiz Management System

Quizo is a full-stack quiz management system that allows users to create, view, edit, and delete quizzes. It is built using **React (frontend) with TypeScript** and **MongoDB (backend)**.

## 🚀 Features
- Create, update, view, and delete quizzes
- User authentication (simple login/logout)
- RESTful API for managing quizzes
- Interactive UI with ShadCN UI components
- Notifications using `react-toastify`

---

## 🛠 Tech Stack
### Frontend:
- React.js (with Vite)
- TypeScript
- React Router
- ShadCN UI Components
- Tailwind CSS
- Axios
- React Toastify

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- TypeScript
- Cors & dotenv

---
Backend Setup

Step 1 : Install dependencies
        npm install
        
Step 2 : Set up the environment variables (.env file )
       PORT=8000
       MONGO_URI=your_mongodb_connection_string

Step 3 : Run the backend server 
         npm start
         The backend will start at http://localhost:8000

Frontend Setup

Step 1 : Navigate to the frontend directory
       cd frontend

Step 2 : Install dependencies
         npm install
         
Step 3 : Start the frontend server
         npm run dev
         The frontend will start at http://localhost:5173/

API Endpoints

Method	Endpoint	Description
GET	/quiz/quizzes	Fetch all quizzes
POST	/quiz/quizzes	Create a new quiz
GET	/quiz/quizzes/:id	Get quiz by ID
PUT	/quiz/quizzes/:id	Update quiz by ID
DELETE	/quiz/quizzes/:id	Delete quiz by ID
POST /user/login 
POST /user/register


Expected API Response (JSON)

{
  "success": true,
  "message": "Quizzes fetched successfully",
  "data": {
    "quiz": [
      {
        "_id": "65cdef1234abcd56789ef012",
        "title": "JavaScript Basics",
        "description": "A quiz to test your knowledge of JavaScript fundamentals.",
        "questions": [
          {
            "questionText": "What is the correct syntax for a JavaScript function?",
            "options": ["function myFunc() {}", "def myFunc():", "myFunc = () => {}", "void myFunc()"],
            "correctAnswer": "function myFunc() {}"
          }
        ],
        "createdAt": "2025-02-15T12:34:56.789Z",
        "updatedAt": "2025-02-15T12:34:56.789Z"
      },
      {
        "_id": "65cdef5678ghij90123klmno",
        "title": "ReactJS Quiz",
        "description": "Test your understanding of ReactJS concepts.",
        "questions": [
          {
            "questionText": "What is the purpose of useEffect in React?",
            "options": ["To manage side effects", "To define state", "To handle events", "To create a component"],
            "correctAnswer": "To manage side effects"
          }
        ],
        "createdAt": "2025-02-15T13:00:45.123Z",
        "updatedAt": "2025-02-15T13:00:45.123Z"
      },
      {
        "_id": "65cdef9012qrst34567uvwx",
        "title": "Data Structures",
        "description": "A quiz covering fundamental data structures like Arrays, Stacks, and Queues.",
        "questions": [
          {
            "questionText": "Which data structure follows FIFO (First In, First Out)?",
            "options": ["Stack", "Queue", "Linked List", "Heap"],
            "correctAnswer": "Queue"
          }
        ],
        "createdAt": "2025-02-15T13:15:30.567Z",
        "updatedAt": "2025-02-15T13:15:30.567Z"
      }
    ]
  }
}




        

