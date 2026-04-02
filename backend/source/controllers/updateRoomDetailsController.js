import updateRoomDetailsService from '../services/updateRoomDetailsService.js'
async function updateRoomDetailsController(req,res){
    const roomId = req.room._id
    const {title,visibility,isActive} = req.body;
    const result = await updateRoomDetailsService(roomId,{title,visibility,isActive});
    return res.status(200).json({
        success:true,
        message:'Updated successfully',
        data :result
    })

}
export default updateRoomDetailsController;

