export default function generateCursorMoveEvents({io,socket,roomUsers}){

    //cursor indicator
    socket.on("cursor-move",({roomId,position,fileId})=>{
        console.log("fileId",fileId);
        if(!roomId || !fileId || typeof position.lineNumber !== 'number' || typeof position.column !== 'number') return;
        if(!roomUsers.has(roomId)) return;
        const room = roomUsers.get(roomId);

        if(!socket.rooms.has(roomId)) return;
        
        room.cursors.set(socket.id,{
            ...position,
            fileId,
            userName:socket.user?.name
        });
        console.log("socket move",room.cursors);


        socket.to(roomId).emit("cursor-update",{
            userId:socket.user?.id,
            position,
            fileId,
            userName:socket.user?.name
        });
    })
            

    // typing indicator
    socket.on("typing",({roomId})=>{
        if(!roomId) return;
        if(!roomUsers.has(roomId)) return;
        if(!socket.rooms.has(roomId)) return;
         socket.to(roomId).emit("user-typing",{
        socketId:socket.id,
        userName:socket.user?.name
    }) 
    }) ;
    
}
