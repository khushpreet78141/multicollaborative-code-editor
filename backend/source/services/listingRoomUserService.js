import RoomMember from "../models/roomMemberSchema.js"

async function listingRoomUserService(userId){
    const rooms = await RoomMember.find({memberId:userId})
        .select("roomId memberId role")
        .populate({path:"roomId",select:"title owner visibility",populate:{path:"owner",select:"username"}});

    
    
    return rooms
     .filter(m => m.roomId).map(m=>({
        roomId:m.roomId._id,
        title:m.roomId.title,
        ownerName:m.roomId.owner?.username,
        visibility:m.roomId.visibility,
        role:m.role
    }));

}
export default listingRoomUserService;