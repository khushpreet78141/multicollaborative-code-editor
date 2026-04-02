import RoomMember from "../models/roomMemberSchema.js"

async function listingRoomUserService(userId){
    const rooms = await RoomMember.find({memberId:userId})
        .select("roomId memberId role")
        .populate([{path:"roomId",select:"title owner visibility"}])


    return rooms.map(m=>({
        roomId:m.roomId._id,
        title:m.roomId.title,
        owner:m.roomId.owner,
        visibility:m.roomId.visibility,
        role:m.role
    }));
    
}

export default listingRoomUserService;