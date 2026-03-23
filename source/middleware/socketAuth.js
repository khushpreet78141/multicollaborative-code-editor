import jwt from "jsonwebtoken"
import User from "../models/userSchema.js";
const socketAuth = async (socket, next) => {
    try {
        const cookie = socket.handshake.headers.cookie;
        if (!cookie) {
    return next(new Error("No cookie found"));
}
        const token = cookie
            ?.split("; ")
            .find(row => row.startsWith("token="))
            ?.split("=")[1];

        if (!token) {
            return next(new Error("Unauthorized"))

        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await User.findById(decoded.userId).select("_id name email");

        if (!user) {
            return next(new Error("User not found!"));
        }


        socket.user = {
            id: user._id.toString(),
            name: user.name,
            email: user.email
        };
        next()
    } catch (err) {
        return next(new Error("Unauthorized"))
    }

}
export default socketAuth;

