export default async function getFileContentController(req,res) {
    const roomId = req.room._id;
    const fileId = req.params.fileId;

    if(!fileId){
        return res.status(400).json({
            success:false,
            message:"fileId not found !"
        })
    }

    const content = await getFileContentService(roomId,fileId);
    res.status(200).json({
        success:true,
        data:content
    })
}