
import RoomMember from "../models/roomMemberSchema.js";

import AppError from '../utils/AppError.js';
async function changeMemberRoleService(roomId,memberId,role) {
    
    const updated = await RoomMember.findOneAndUpdate({roomId,memberId},{$set:{role}},{returnDocument:"after",runValidators:true});

    if(!updated){
        throw new AppError("RoomMember not found in the room");
    }
    return updated;

}

export default changeMemberRoleService;