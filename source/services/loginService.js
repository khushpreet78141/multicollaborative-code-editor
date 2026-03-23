import User from "../models/userSchema.js";
import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';


export default async function loginService(email,password){
    const findUser = await User.findOne({email});
    if(!findUser){
        throw new AppError("user with this email not found",404)
    }
    const userPass = await bcrypt.compare(password,findUser.passwordHash)

    if(!userPass){
        throw new AppError("Invalid Credentials",409);
    }
    const token = jwt.sign(
        {userId:findUser._id},
        process.env.JWT_SECRET_KEY,
        {expiresIn:'1d'}
    )
    return token


}