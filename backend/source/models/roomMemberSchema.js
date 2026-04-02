import mongoose from "mongoose";
const Schema = mongoose.Schema


const roomMemberSchema = new Schema({
    roomId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Room",
        required:true,
    },
    memberId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"User" ,
        required:true  
    },

    role:{
        type:String,
        enum:["owner","viewer","editor"],
        default:"viewer"
    }   
},{timestamps:true});


roomMemberSchema.index({ roomId: 1, memberId: 1 }, { unique: true });
const roomMemberModel = mongoose.model("RoomMember",roomMemberSchema);
export default roomMemberModel;
