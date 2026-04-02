import getAllFilesService from "../services/getAllFilesService.js";

export default async function getAllFilesController(req,res){
    const roomId = req.room?._id
    if(!roomId){
        return res.status(400).json({
            success:false,
            message:"roomid not found!"
        })
    }

    const files = await getAllFilesService(roomId);
    res.status(200).json({
        success:true,
        data:files
    })
}