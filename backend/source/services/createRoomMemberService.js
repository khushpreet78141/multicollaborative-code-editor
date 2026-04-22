import Room from "../models/roomSchema.js";
import RoomMember from "../models/roomMemberSchema.js";
import AppError from '../utils/AppError.js'

async function createRoomMemberService(inviteCode,userId){  
             
        const findRoom = await Room.findOne({inviteCode})
        if(!findRoom){

            throw new  AppError("room not found",404)
        }
        try{

            const findMember = await RoomMember.findOne({roomId:findRoom._id,memberId:userId});
            if(findMember) return findMember;
            const member = await RoomMember.create({
            roomId:findRoom._id,
            memberId:userId,
        });
        

        return member   
        }
        catch(error){
            throw error
        }   
}

export default createRoomMemberService;





