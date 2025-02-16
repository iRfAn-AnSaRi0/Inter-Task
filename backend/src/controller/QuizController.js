import { QuizDetails } from "../model/Quiz.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { UserDetails } from "../model/User.js";
import mongoose from "mongoose";

const CreateQuiz = AsyncHandler(async (req, res) => {
    const { title, description, questions } = req.body;

    // Ensure all questions have 4 options
    if (!questions.every(q => q.options.length === 4)) {
        return res.status(400).json({ error: "Each question must have exactly 4 options." });
    }

 
    const Quiz = await QuizDetails.create({
        title,
        description,
        questions,
    })

    if (!Quiz) {
        return res.status(500).json(
            new ApiError(
                500,
                {},
                "Server Error"
            )
        )
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            { Quiz },
            "Quiz Created"
        )
    )
})

const GetAllQuiz = AsyncHandler(async (req, res) => {

    const quiz = await QuizDetails.find();

    if (!quiz) {
        return res.status(500).json(
            new ApiError(
                500,
                {},
                "Server Error"
            )
        )
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            { quiz },
            "quiz fetch successfully"
        )
    )


})

const GetQuiz = AsyncHandler(async (req, res) => {
    const quizId  = req.params.id
    console.log(quizId);


    const quiz = await QuizDetails.findById(quizId)


    if (!quiz) {
        return res.status(500).json(
            new ApiError(
                500,
                {},
                "Server Error"
            )
        )
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            { quiz },
            "quiz fetch successfully"
        )
    )


})

const UpdateQuiz = AsyncHandler(async (req, res) => {


    const { title, description, questions } = req.body;

    const quizId = await QuizDetails.findById(req.params.id);

    quizId.title = title || quizId.title
    quizId.description = description || quizId.description
    quizId.questions = questions || quizId.questions

    const updateQuiz = await quizId.save()

    if (!updateQuiz) {
        return res.status(500).json(
            new ApiError(
                500,
                {},
                "Server Error"
            )
        )
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            { updateQuiz },
            "Quiz is updated successfully"
        )
    )

})

const DeleteQuiz = AsyncHandler(async (req, res) => {
    const QuizId = await QuizDetails.findById(req.params.id)

    if (!QuizId) {
        return res.status(401).json(
            new ApiError(
                401,
                {},
                "Quiz not found"
            )
        )
    }

    const removeQuiz = await QuizDetails.deleteOne({ _id: QuizId })
    if (!removeQuiz) {
        return res.status(500).json(
            new ApiError(
                500,
                {},
                "Server Error"
            )
        )
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Quiz is deleted successfully"
        )
    )
})




export { CreateQuiz, UpdateQuiz, DeleteQuiz, GetAllQuiz, GetQuiz }