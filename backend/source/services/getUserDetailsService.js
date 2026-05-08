
import User from '../models/userSchema.js'
import AppError from '../utils/AppError.js'
export default async function getUserDetailsService(userId){
    const details = await User.findById(userId);
    if(!details){
        return new AppError("user not found",404)
    }
    return details;
}