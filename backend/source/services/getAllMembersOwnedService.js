import RoomMember from "../models/roomMemberSchema.js"

export default async function getAllMembersOwnedService(roomId){
    const members = await RoomMember.find({roomId}).sort({createdAt:1})
                            .populate("memberId","username");
    return members;
}