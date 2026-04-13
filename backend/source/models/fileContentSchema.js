import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const fileContentSchema = new Schema({
    fileId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"File",
        required:true,
    },
    lastEditedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
       
    },
    content:{
        type:String,
        default:""
        
    },
    version:{
        type:Number,
        default:0,
        required:true
    }

},{timestamps:true});

fileContentSchema.index({ fileId: 1 });
const fileContentModel = mongoose.model("FileContent",fileContentSchema);
export default fileContentModel;


