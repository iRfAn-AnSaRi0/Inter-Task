import { UserDetails } from "../model/User.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import bcrypt from "bcrypt";




const Register = AsyncHandler(async (req, res) => {
    const { username,  password } = req.body;

    const userExists = await UserDetails.findOne({ username});
    if (userExists) {
        return res.status(400).json(
            new ApiError(
                400,
                "User Already Exists"
            )
    
        )
    }

    const userCreated = await UserDetails.create({
        username,
        password
    })

    if (userCreated) {
        return res.status(200).json(
            new ApiResponse(
                200,
                "Register Successfully"
            )
        )
    } else {
        return res.status(500).json(
            new ApiError(
                500,
                "Internal Server Error"
            )
        )
    }

})

const Login = AsyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await UserDetails.findOne({ username });

    if (!user) {
        return res.status(400).json(
            new ApiError(
                400,
                "Invalid username"
            )
        )
    }


    const passwordcheck = await bcrypt.compare(password, user.password)

    if (!passwordcheck) {
        return res.status(400).json(
            new ApiError(
                400,
                "Invalid password"
            )
        )
    }


    return res.status(200)
        
        .json(
            new ApiResponse(
                200,
                {},
                "Login Successfully"
            )
        )

})


export { Register , Login }