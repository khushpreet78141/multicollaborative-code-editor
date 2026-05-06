
import activeFiles from "../source/stores/activeFileStore.js";
import scheduleSave from "../source/utils/debouncedSave.js";
import redisClient from "../source/utils/redisClient.js";
import File from "../source/models/fileSchema.js";
export default function registerCodeChangeEvents({socket,io,roomUsers}){
    socket.on("code-change",async({roomId,fileId,code})=>{
        if(!roomId || !fileId || typeof code !== 'string') return;
        // Ensure socket actually belongs to file room
        
        if (!socket.rooms.has(roomId)) return;
        const role = socket.data.roles?.[roomId]

        if (role !== "owner" && role !== "editor"){
            return socket.emit("error","Permission Denied. your code is not broadcasting !")
        };

        const file = await File.findById(fileId);
        if(!file){
             return socket.emit("error","fILE NOT FOUND !")
        } ;
       
        const rediskey = `file:${fileId}`    
        await redisClient.set(rediskey,code);
        scheduleSave(fileId,file.filePath);
        socket.to(roomId).emit("code-update",{fileId,code});

    });
    
}

