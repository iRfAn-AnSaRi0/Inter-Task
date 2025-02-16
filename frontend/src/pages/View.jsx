import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";

function View() {
  const { quizId } = useParams(); // Get quiz ID from URL
  const [quiz, setQuiz] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/quiz/quizzes/${quizId}`);
       
        
         setQuiz(response.data.data.quiz.questions);
      } catch (error) {
        toast.error("Failed to fetch quiz details.");
      }
    };

    fetchQuizDetails();
  }, [quizId]);

  if (!quiz) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      <h2 className="text-2xl font-bold text-center mb-4">{quiz.title}</h2>
      <p className="text-gray-700 text-center mb-6">{quiz.description}</p>

      {quiz.map((question, index) => (
        <div key={index} className="mb-6 p-4 border rounded-md">
          <h3 className="font-semibold text-lg">Question {index + 1}:</h3>
          <p className="text-gray-700 mb-3">{question.questionText}</p>

          {/* Options List */}
          <ul className="space-y-2">
            {question.options.map((option, optIndex) => (
              <li
                key={optIndex}
                className={`px-4 py-2 border rounded-md ${
                  option === question.correctAnswer ? "bg-green-200" : "bg-gray-100"
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default View;
