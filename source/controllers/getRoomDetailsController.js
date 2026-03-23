
async function getRoomDetailsController(req,res){
    const roomId = req.room._id
    if(!roomId){

        return res.status(400).json({
            success:false,
            message:"roomId not defined !"
        })

    }

    return res.status(200).json({
        success:true,
        room:{
            _id:req.room._id,
            title:req.room.title,
            visibility:req.room.visibility,
            owner:req.room.owner,
            role:req.roomRole
        }
    })
}


export default getRoomDetailsController;

