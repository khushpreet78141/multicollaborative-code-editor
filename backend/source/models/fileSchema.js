import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const fileSchema = new Schema({

    roomId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Room",
        required:true
    },

    fileName:{
        type:String,
        required:true,
        trim:true
    },
    
    type:{
        type:String,
        enum:["file","folder"],
        default:"file",
        required:true
    },
    

    language:{
        type:String,
        trim:true
    },
    
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    isDeleted:{
        type:Boolean,
        default:false
    },
     filePath: {
        type: String,
        required: function () {
            return this.type === "file";
        }
    },
        lastModified: {
        type: Date,
        default: Date.now
    }

},{timestamps:true});

fileSchema.index({roomId:1,parent:1,fileName:1},{unique:true});
const fileModel = mongoose.model("File",fileSchema);
export default fileModel;
