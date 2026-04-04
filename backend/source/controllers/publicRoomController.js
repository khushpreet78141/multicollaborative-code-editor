import Room from "../models/roomSchema.js";

export default async function publicRoomController(req,res){
    const rooms = await Room.find({visibility:"public"})
                            .populate("owner","username");
    res.status(200).json({
        success:true,
        data:rooms
    })
    
}
