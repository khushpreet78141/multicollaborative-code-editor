import removeRoomMemberService from "../services/removeRoomMemberService.js"

async function removeRoomMemberController(req,res){
    const  roomId = req.room._id
    const memberId = req.params.memberId



    const message = await removeRoomMemberService(roomId,memberId)
    return res.status(200).json({
        success:true,
        message:"member removed successfully",
        
    })

}

export default removeRoomMemberController;