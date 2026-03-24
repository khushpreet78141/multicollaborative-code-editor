import RoomMember from "../source/models/roomMemberSchema.js";
import activeFiles from "../source/stores/activeFileStore.js";
import scheduleSave from "../source/utils/debouncedSave.js";
export default function registerCodeChangeEvents({socket,io,roomUsers}){
    socket.on("code-change",async({roomId,fileId,code})=>{
        if(!roomId || !fileId || typeof code !== 'string') return;

        if(!activeFiles.has(fileId)) return;
         // Ensure socket actually belongs to file room
        if (!socket.rooms.has(roomId)) return;

        const role = socket.data.roles?.[roomId]
        if (role !== "owner" && role !== "editor") return;

        //update activeFiles
        const fileState = activeFiles.get(fileId);

        if(fileState){
            fileState.content = code
            fileState.changed = true
            fileState.lastEditedBy = socket.user.id
            scheduleSave(fileId)

        }
        socket.to(roomId).emit("code-update",{fileId,code});
    })
}

