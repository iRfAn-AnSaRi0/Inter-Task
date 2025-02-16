import express from 'express';
import cors from 'cors';

const app = express();

app.use("*",cors({
    origin:"http://localhost:5173" ,  // Allow requests from this origin
}));

app.use(express.json({ limit: "24kb" }));
app.use(express.urlencoded({ limit: "24kb", extended: true }));

import { userrouter } from "./routes/UserRoute.js";
app.use("/user", userrouter);

import { quizrouter } from './routes/QuizRoute.js';
app.use("/quiz", quizrouter);

export { app };
