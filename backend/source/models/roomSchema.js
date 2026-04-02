import mongoose from "mongoose";
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },

    title:{
        type:String,
        required:true,
        trim:true
    },

    inviteCode:{
        type:String,
        unique:true
        
    },

    visibility:{
        type:String,
        enum:["public","private"],
        default:"public"
    },
    
    isActive:{
        type:Boolean,
        default:true,
    }

},{timestamps:true});


const roomModel = mongoose.model("Room",roomSchema);
export default roomModel;