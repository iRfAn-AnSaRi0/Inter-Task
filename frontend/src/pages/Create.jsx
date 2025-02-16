import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Create() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);

  // Handle question input change
  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].questionText = value
    setQuestions(updatedQuestions);
  };

  // Handle option input change
  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex] = value.trim(); // Trim to prevent spaces
    setQuestions(updatedQuestions);
  };

  // Handle correct answer selection
  const handleCorrectAnswerChange = (qIndex, value) => {
    const updatedQuestions = [...questions];
    if (!updatedQuestions[qIndex].options.includes(value)) {
      toast.error("Correct answer must be one of the options.");
      return;
    }
    updatedQuestions[qIndex].correctAnswer = value.trim();
    setQuestions(updatedQuestions);
  };

  // Add a new question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  // Submit the quiz
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation before sending request
    if (!title.trim() || !description.trim()) {
      toast.error("Title and description are required.");
      return;
    }

    for (const q of questions) {
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

    const quizData = { title, description, questions };

    try {
      const response = await axios.post("http://localhost:8000/quiz/quizzes", quizData);
      toast.success(response.data.message);
       navigate("/viewall")
      // Reset form after success
      setTitle("");
      setDescription("");
      setQuestions([{ questionText: "", options: ["", "", "", ""], correctAnswer: "" }]);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Create a Quiz</h2>

      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-gray-700">Quiz Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Questions Section */}
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="mb-6 p-4 border rounded-md">
            <label className="block text-gray-700">Question {qIndex + 1}</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={opt}
                  onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                  required
                />
              </div>
            ))}

            {/* Correct Answer Selection */}
            <div className="mt-2">
              <label className="block text-gray-700">Correct Answer</label>
              <select
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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

        {/* Add Question Button */}
        <button
          type="button"
          className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition"
          onClick={addQuestion}
        >
          Add Question
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 transition"
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
}

export default Create;
