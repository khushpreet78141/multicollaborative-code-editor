import createRoomService from "../services/createRoomService.js";

async function createRoomController(req,res){
    try{
    const { title ,  visibility } = req.body
    if( !title ||  !visibility){
        return res.status(400).json({
            success:false,
            message:"Details not defined !!"
        })
    }
    const result = await createRoomService(req.user.userId,title,visibility);
    res.status(201).json({
        success:true,
        message:"Room successfully created !",
        roomId:result.roomId,
        role:result.role,
        inviteCode:result.inviteCode      
    })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Internal server error !"
        })
    }
}

export default createRoomController;