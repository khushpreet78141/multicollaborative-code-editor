import deleteRoomService from "../services/deleteRoomServices.js";
async function deleteRoomController(req,res){
    const roomId = req.params.roomId
    if(!roomId){
        return res.status(400).json({
            success:false,
            message:"roomId not found !"
        })
    }
    await deleteRoomService(roomId);
    res.status(200).json({
        success:true,
        message:"Deletion successfull ! "
    })
}

export default deleteRoomController;