import RoomMember from '../models/roomMemberSchema.js'
import AppError from '../utils/AppError.js';
import Room from '../models/roomSchema.js'

async function removeRoomMemberService(roomId,memberId){
    const room = await Room.findById(roomId);

    if(!room){
        throw new AppError("room not found !",404);
    }
    if(room.owner.toString() === memberId){
        throw new AppError("room owner can't be removed",400)
    }
    const deletedMember = await RoomMember.deleteOne({roomId,memberId});

    if(deletedMember.deletedCount===0){
        throw new AppError("Member not found in this room!",404);
    }
    
}

export default removeRoomMemberService;
