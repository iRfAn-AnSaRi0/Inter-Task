import mongoose, { Schema } from "mongoose";

const quizSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    questions: [
        {
            questionText: {
                type: String,
                required: true,
                trim: true,
            },
            options: {
                type: [String], // Array of 4 options
                validate: {
                    validator: function (arr) {
                        return arr.length === 4;
                    },
                    message: "There must be exactly 4 options.",
                },
                required: true,
            },
            correctAnswer: {
                type: String,
                required: true,
                validate: {
                    validator: function (value) {
                        return this.options.includes(value);
                    },
                    message: "Correct answer must be one of the options.",
                },
            },
        },
    ],
    teacherId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" 
    }

}, { timestamps: true })




export const QuizDetails = mongoose.model("QuizDetails", quizSchema)