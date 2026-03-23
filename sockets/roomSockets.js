export default function registerRoomEvents(io,socket,roomUsers){
    //join room
    socket.on("join-room",({roomId})=>{
        if(!roomId) return;
        //join socket.io room
        socket.join(roomId);

        //Initialize room if not exists
        if(!roomUsers.has(roomId)){
            roomUsers.set(roomId,{
                users:[],
                code:"",
                cursors: new Map(),
                saveTimer:null,
            });
        }

       const room = roomUsers.get(roomId);

        //prevent duplicate joins
        const alreadyExists = room.users.find(
            user=> user.socketId === socket.id
        )
        if(!alreadyExists){
            room.users.push({
                socketId:socket.id,
                userId:socket.user.id,
                username:socket.user?.name,
                activeFileId:null
            })
        }
        socket.emit("code-update", {
    code: room.code
});
        //send updated users list to everyone in room

        io.to(roomId).emit("room-users",room.users);

        //notify others
        socket.to(roomId).emit("user-joined",{
            socketId:socket.id,
            username:socket.user?.name
        })

        console.log(`${socket.user.name} joined room ${roomId}`);
    })

    //Disconnect

    socket.on("disconnect",()=>{
        for(const [roomId,room] of roomUsers.entries()){
            const originalLength = room.users?.length;
            room.users = room.users.filter(
                user=>user.socketId !== socket.id
            )
             
        if(room.users.length !== originalLength){
            //notify others in room
            socket.to(roomId).emit("user-left",{
                socketId:socket.id,
                username:socket.user?.name
            }) 
            //update room users list
            io.to(roomId).emit("room-users",room.users)
        }
        //cleanup : remove empty room
        if(room.users.length===0){
            roomUsers.delete(roomId);
        } }
    })
}