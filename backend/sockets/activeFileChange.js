
//to show which user is editing which file

export default function({io,socket,roomUsers}){
    socket.on("active-file-change",({roomId,fileId})=>{
        const room = roomUsers.get(roomId)
        if(!room) return;
        const user = roomUsers.user.find(u=>u.socketId===socket.id);
        if(!user) return;
        user.activeFileId = fileId

        io.to(roomId).emit("active-file-updated",{socketId:socket.id,fileId})

    })
}