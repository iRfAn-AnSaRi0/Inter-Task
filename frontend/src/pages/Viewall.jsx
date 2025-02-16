import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";

function Viewall() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  // Fetch quizzes from the backend
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/quiz/quizzes");
        setQuizzes(response.data.data.quiz);
      } catch (error) {
        toast.error("Failed to load quizzes.");
      }
    };
    fetchQuizzes();
  }, []);

  // Handle delete quiz
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;
    try {
      await axios.delete(`http://localhost:8000/quiz/quizzes/${id}`);
      setQuizzes(quizzes.filter((quiz) => quiz._id !== id));
      toast.success("Quiz deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete quiz.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Quizzes</h2>
        <button
          className="bg-blue-500 text-white flex items-center px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={() => navigate("/createQuiz")}
        >
          <Plus size={20} className="mr-2" />
          Create Quiz
        </button>
      </div>

      {quizzes.length === 0 ? (
        <p className="text-center text-gray-500">No quizzes available.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">Title</th>
              <th className="border p-3">Description</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz._id} className="border text-center">
                <td className="border p-3">{quiz.title}</td>
                <td className="border p-3">{quiz.description}</td>
                <td className="border p-3 flex justify-center space-x-4">
                  <button
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    onClick={() => navigate(`/view/${quiz._id}`)}
                    title="View Details"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                    onClick={() => navigate(`/edit/${quiz._id}`)}
                    title="Edit Quiz"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                    onClick={() => handleDelete(quiz._id)}
                    title="Delete Quiz"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Viewall;
