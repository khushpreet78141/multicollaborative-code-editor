import File from "../models/fileSchema.js";

export default async function getAllFilesService(roomId){
    const files = await File.find({roomId}).lean()
    
    return files
}