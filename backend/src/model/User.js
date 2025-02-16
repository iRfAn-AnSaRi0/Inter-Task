import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        required: true
    }

})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next();
})


export const UserDetails = mongoose.model("UserDetails", userSchema)