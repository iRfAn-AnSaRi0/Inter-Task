import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react"; // Import ArrowLeft icon
import "react-toastify/dist/ReactToastify.css";

function Edit() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  // State to store quiz data
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    questions: [],
  });

  // Fetch quiz details
  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/quiz/quizzes/${quizId}`);
        const fetchedQuiz = response.data.data.quiz;
        setQuiz(fetchedQuiz);
      } catch (error) {
        toast.error("Failed to fetch quiz details.");
      }
    };

    fetchQuizDetails();
  }, [quizId]);

  // Handle input changes for title & description
  const handleInputChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  // Handle question text change
  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], questionText: value };
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  // Handle option change
  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  // Handle correct answer selection
  const handleCorrectAnswerChange = (qIndex, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[qIndex].correctAnswer = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!quiz.title.trim() || !quiz.description.trim()) {
      toast.error("Title and description are required.");
      return;
    }

    for (const q of quiz.questions) {
      if (!q.questionText.trim()) {
        toast.error("Each question must have text.");
        return;
      }
      if (q.options.some((opt) => !opt.trim())) {
        toast.error("Each question must have four valid options.");
        return;
      }
      if (!q.correctAnswer.trim() || !q.options.includes(q.correctAnswer)) {
        toast.error("Correct answer must be selected from the options.");
        return;
      }
    }

    try {
      await axios.put(`http://localhost:8000/quiz/quizzes/${quizId}`, quiz);
      toast.success("Quiz updated successfully!");
      navigate("/Viewall");
    } catch (error) {
      toast.error("Failed to update quiz.");
    }
  };

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

      <h2 className="text-2xl font-bold text-center mb-4">Edit Quiz</h2>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700">Quiz Title</label>
          <input
            type="text"
            name="title"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            value={quiz.title}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            value={quiz.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        {/* Questions */}
        {quiz.questions.length > 0 &&
          quiz.questions.map((q, qIndex) => (
            <div key={qIndex} className="mb-6 p-4 border rounded-md">
              <label className="block text-gray-700">Question {qIndex + 1}</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                value={q.questionText}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                required
              />

              {/* Options */}
              {q.options.map((opt, optIndex) => (
                <div key={optIndex} className="mt-2">
                  <label className="block text-gray-600">Option {optIndex + 1}</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                    value={opt}
                    onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                    required
                  />
                </div>
              ))}

              {/* Correct Answer */}
              <div className="mt-2">
                <label className="block text-gray-700">Correct Answer</label>
                <select
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                  value={q.correctAnswer}
                  onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
                  required
                >
                  <option value="">Select Correct Answer</option>
                  {q.options.map((opt, optIndex) => (
                    <option key={optIndex} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 transition"
        >
          Update Quiz
        </button>
      </form>
    </div>
  );
}

export default Edit;
