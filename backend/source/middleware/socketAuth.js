import jwt from "jsonwebtoken"
import User from "../models/userSchema.js";
const socketAuth = async (socket, next) => {
    try {
        
        const token = socket.handshake.auth?.token;

        
       
        if (!token) {
            return next(new Error("Unauthorized"));
        } 
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await User.findById(decoded.userId).select("_id username email");
        if (!user) {
            return next(new Error("User not found!"));
        }
        socket.user = {
            id: user._id.toString(),
            name: user.username,
            email: user.email
        };
        // console.log("Authenticated user:", socket.user);

        next()

    } catch (err) { 
        return next(new Error("Unauthorized"));
    }

}
export default socketAuth;

