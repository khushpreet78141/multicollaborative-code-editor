import RoomMember from "../models/roomMemberSchema.js"
import Room from "../models/roomSchema.js"
import AppError from '../utils/AppError.js';
async function leaveRoomService(roomId,memberId){
    const room = await Room.findById(roomId)
    if(!room){
        throw new AppError("Room not found !",404)
    }
    if(room.owner.toString()===memberId){
        throw new AppError("Room owner cannot exit the room !",400)
    }
    const exited = await RoomMember.deleteOne({roomId,memberId})
    if(exited.deletedCount===0){
        throw new AppError("Member not found in the room !",404)
    }


}
export default leaveRoomService;