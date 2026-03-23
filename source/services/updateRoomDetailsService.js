import Room from "../models/roomSchema.js"

async function updateRoomDetailsService(roomId,data) {
    const findroom = await Room.findById(roomId)
    if(!findroom){
        throw new AppError("room not found !")
    }
    const updated = {}
    if(data.title !== undefined) updated.title = data.title;
    if(data.isVisibility !== undefined) updated.isVisibility = data.isVisibility;
    if(data.isActive !== undefined) updated.isActive = data.isActive;

    const result = await Room.findByIdAndUpdate(roomId,updated,{returnDocument:"after",runValidators:true});
    if(!result){
        throw new AppError("Updation failed !")
    }
    return result;

};

export default updateRoomDetailsService;
