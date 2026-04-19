
import getAllMembersOwnedService from "../services/getAllMembersOwnedService.js";
export default async function getAllMembersOwnedController(req,res){
    const roomId = req.params.roomId;
    if(!roomId){
        return res.status(400).json({
            success:false,
            message:"roomId is not defined"
        })
    }

    const result = await getAllMembersOwnedService(roomId)
                            
    return res.status(200).json({
        success:true,
        data:result
    })
}