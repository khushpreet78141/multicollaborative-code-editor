import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chatSchema = new Schema({
    roomId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Room",
        required:true

    },
    text:{
        type:String,
        required:true,
        maxLength:500,
        trim:true
        
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    },

},{timestamps:true})

chatSchema.index({roomId:1,createdAt:-1})
const chatModel = mongoose.model("Chat",chatSchema);
export default chatModel;