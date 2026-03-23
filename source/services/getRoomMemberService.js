async function getRoomMemberService(roomId){
    const member = await RoomMember.find({roomId})
                    .select("memberId role createdAt")
                    .populate("memberId","name email");
    
    return member;

}

export default getRoomMemberService;