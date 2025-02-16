import { Router } from "express";

import { Login } from "../controller/UserController.js"
import { Register } from "../controller/UserController.js";

const userrouter = Router();

userrouter.route("/register").post(
    Register
)

userrouter.route("/login").post(
    Login
)

export { userrouter }
