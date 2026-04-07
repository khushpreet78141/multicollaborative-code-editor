export default function generateCursorMoveEvents({io,socket,roomUsers}){

    //cursor indicator
    socket.on("cursor-move",({roomId,position})=>{
        if(!roomId || typeof position.lineNumber !== 'number' || typeof position.column !== 'number') return;
        if(!roomUsers.has(roomId)) return;
        const room = roomUsers.get(roomId);

        if(!socket.rooms.has(roomId)) return;
        
         
        room.cursors.set(socket.id,{
            ...position,
            userName:socket.user?.name
        });
        socket.to(roomId).emit("cursor-update",{
            socketId:socket.id,
            position,
            userName:socket.user.name
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
