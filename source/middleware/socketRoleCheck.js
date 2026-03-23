import RoomMember from "../models/roomMemberSchema.js";

const socketRoleCheck = (socket,next)=>{
    socket.use(async(packet,next)=>{
        const [event,data] = packet
        if(event==="codeChange"){
            try{

                const member = await RoomMember.findOne({roomId:data.roomId, memberId:socket.user.id})
                if(member.role === "owner" || member.role==="editor"){
                    next();
                }else{
                    next(new Error("Not Authorized role !"));
                }
                //await checkRole(socket,data.roomId,["editor","owner"])
                
            }catch(err){
                next(new Error("Unauthorized"));
            }
        }
    })
}
export default socketRoleCheck;