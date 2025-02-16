import { Router } from "express";
import { CreateQuiz } from "../controller/QuizController.js";
import { GetAllQuiz } from "../controller/QuizController.js";
import { GetQuiz } from "../controller/QuizController.js";
import { UpdateQuiz } from "../controller/QuizController.js";
import { DeleteQuiz } from "../controller/QuizController.js";

const quizrouter = Router();

quizrouter.route("/quizzes").post(
  CreateQuiz
)

quizrouter.route("/quizzes").get(
    GetAllQuiz
)
quizrouter.route("/quizzes/:id").get(
    GetQuiz
)

quizrouter.route("/quizzes/:id").put(
    UpdateQuiz
)
quizrouter.route("/quizzes/:id").delete(
    DeleteQuiz
)

export { quizrouter }