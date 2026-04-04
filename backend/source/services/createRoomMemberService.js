import Room from "../models/roomSchema.js";
import RoomMember from "../models/roomMemberSchema.js";
import AppError from '../utils/AppError.js'

async function createRoomMemberService(inviteCode,userId){  
             
        const findRoom = await Room.findOne({inviteCode})
        if(!findRoom){

            throw new  AppError("room not found",404)
        }
        try{
            const member = await RoomMember.create({
            roomId:findRoom._id,
            memberId:userId,
        });

        return member   
        }
        catch(error){
            if(error.code===11000){
                throw new AppError("Already a member",409)
            }
            throw error
        }   
}

export default createRoomMemberService;





