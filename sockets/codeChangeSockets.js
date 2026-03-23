import activeFiles from "../source/stores/activeFileStore.js";
import scheduleSave from "../source/utils/debouncedSave.js";
export default function registerCodeChangeEvents({socket,io,roomUsers}){
    socket.on("code-change",({roomId,fileId,code})=>{
        if(!roomId || !fileId || typeof code !== 'string') return;

        if(!activeFiles.has(fileId)) return;
         // Ensure socket actually belongs to file room
        if (!socket.rooms.has(roomId)) return;

            // ensure file exists in memory
    if (!activeFiles.has(fileId)) return;
        room.code = code;

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

