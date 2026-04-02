import createRoomMemberService from '../services/createRoomMemberService.js'

async function createRoomMemberController(req,res) {
    
    let {inviteCode} = req.body;
   
    
    if(inviteCode){
        return res.status(400).json({
            success:false,
            message:"Invite code is not defined"
        })
    };

    //if(inviteLink){
    //    inviteCode = inviteLink.split("/").pop();

    //}
    //let result;

    //if(inviteCode){
    //    result = await createRoomMemberService(inviteCode,req.user.userId);
    //}else if(inviteLink){
    //    result = await createRoomMemberService(inviteLink,req.user.user)
    //}
    const result = await createRoomMemberService(inviteCode,req.user.userId);

    
    res.status(201).json({
        success:true,
        message:"Room member successfully created",
        data:result
    });
    
    
}

export default createRoomMemberController;