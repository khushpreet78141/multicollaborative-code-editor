import getRoomMemberService from '../services/getRoomMemberService.js';

async function getRoomMemberController(req,res){
    const roomId = req.room._id
    if(!roomId){
        return res.status(400).json({
            success:false,
            message:"roomId not defined !"
        });

    }

    const members = await getRoomMemberService(roomId);
    return res.status(200).json({

        success:true,
        members:members

    });
        
};

export default getRoomMemberController;