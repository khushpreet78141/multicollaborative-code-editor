import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        match:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        lowercase:true,
        trim:true
    },
    passwordHash:{
        type:String,
        required:true,
        trim:true

    }
    
},{timestamps:true});

const userModel = mongoose.model("User",userSchema);
export default userModel;


