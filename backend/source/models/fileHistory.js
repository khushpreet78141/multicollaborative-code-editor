import mongoose, { version } from "mongoose";

const Schema = mongoose.Schema;

const fileHistorySchema = new Schema({

    fileId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"File",
        required:true,
      
        index:true
    },
    fileName:{
        type:String,
        default:"",
        required:true
    },
    text:{
        type:String,
        default:""
    },
    version:{
        type:Number,
        required:true
    },
    editedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
 
    
},{timestamps:true});

fileHistorySchema.index({fileId:1,version:1},{unique:true});

const fileHistoryModel = mongoose.model("FileHistory",fileHistorySchema);

export default fileHistoryModel;

