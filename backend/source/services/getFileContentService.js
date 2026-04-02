import FileContent from "../models/fileContentSchema.js"
import AppError from "../utils/AppError.js"


export default async function getFileContentService(roomId,fileId){
    const content = await FileContent.findOne({roomId,fileId}).lean()
    if(!content){
        throw new AppError("file not found",400)
    }
    return content
    
}