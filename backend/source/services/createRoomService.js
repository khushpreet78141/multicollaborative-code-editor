import Room from "../models/roomSchema.js"
import RoomMember from "../models/roomMemberSchema.js"
import generateInviteCode from "../utils/generateInviteCode.js"
import mongoose from "mongoose";
import AppError from "../utils/AppError.js"

async function createRoomService(userId,title,visibility){
    let code = generateInviteCode();
    const room = await Room.create([{owner:userId,title,inviteCode:code,visibility}]);  
    const result = {roomId:room[0]._id,inviteCode:room[0].inviteCode};

    const memberRole = await RoomMember.create({
        roomId:result.roomId,
        memberId:userId,
        role:"owner"
    });
    

    return result;

}

export default createRoomService;

