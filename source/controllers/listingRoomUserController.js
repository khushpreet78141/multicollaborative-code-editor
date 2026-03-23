
import listingRoomUserService from "../services/listingRoomUserService.js"
async function listingRoomUserController(req,res){
    const userId = req.user.userId
    const rooms = await listingRoomUserService(userId)
    res.status(200).json({
        success:true,
        rooms
    })
}

export default listingRoomUserController;
