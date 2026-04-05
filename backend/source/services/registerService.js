import bcrypt from 'bcrypt'
import User from '../models/userSchema.js';
import AppError from '../utils/AppError.js';
import jwt from 'jsonwebtoken'

export default async function registerService(username,email,password){
    const hashedPass = await bcrypt.hash(password,10);
    const user = await User.findOne({email});
    if(user){
        throw new AppError("user already exist",409)
    }
    
   const registeredUser = await User.create({
            username,
            email,
            passwordHash:hashedPass
        });

        const token = jwt.sign(
            {userId:registeredUser._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn: '1d'}
        );

        return token
}