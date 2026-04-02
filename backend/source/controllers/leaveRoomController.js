import leaveRoomService from "../services/leaveRoomService.js"

async function leaveRoomController(req,res){

    const roomId = req.params.roomId
    if(!roomId){
        return res.status(400).json({
            success:false,
            message:"Room Not found !"
        })
    }
    await leaveRoomService(roomId,req.user.userId)

    return res.status(200).json({
        success:true,
        message:"member leave the room successfully"
    })
}

export default leaveRoomController;