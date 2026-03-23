import Room from "../models/roomSchema.js";
import AppError from "../utils/AppError.js";

async function deleteRoomService({roomId}){
    const room = await Room.findByIdAndDelete(roomId);
    if(!room){
        throw new AppError("Room for deletion not found !",400);
    }

}


export default deleteRoomService;