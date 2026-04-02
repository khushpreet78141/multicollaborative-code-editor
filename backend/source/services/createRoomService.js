import Room from "../models/roomSchema.js"
import RoomMember from "../models/roomMemberSchema.js"
import generateInviteCode from "../utils/generateInviteCode.js"
import mongoose from "mongoose";
import AppError from "../utils/AppError.js"

async function createRoomService(userId,title,visibility){
    let code = generateInviteCode();
    let room;
    let result;
    if(visibility==="private"){
    room = await Room.create([{owner:userId,title,inviteCode:code,visibility}]);  
    result = {roomId:room[0]._id,inviteCode:room[0].inviteCode};
    }else{
        room = await Room.create([{owner:userId,title,visibility}]);  
    result = {roomId:room[0]._id};
    }
    

    const memberRole = await RoomMember.create({
        roomId:result.roomId,
        memberId:userId,
        role:"owner"
    });
    

    return result;

}

export default createRoomService;

