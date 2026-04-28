import activeFiles from "../source/stores/activeFileStore.js";
import RoomMember from "../source/models/roomMemberSchema.js";
import redisClient from "../source/utils/redisClient.js";

export default function registerRoomEvents(io,socket,roomUsers){
    //join room
    socket.on("join-room",async({roomId,fileId})=>{
        if(!roomId) return;

        const member = await RoomMember.findOne({
        roomId,
        memberId: socket.user.id
         
    });

    if (!member) return socket.emit("error","Not a member of this room !");
    socket.data.roles = socket.data.roles || {};
    socket.data.roles[roomId] = member.role;
    //join socket.io room
    socket.join(roomId);
    
        //Initialize room if not exists
        if(!roomUsers.has(roomId)){
            roomUsers.set(roomId,{
                users:[],
                cursors: new Map(),
                saveTimer:null,
            });
        }
        
       const room = roomUsers.get(roomId);
    
       
        //prevent duplicate joins
        const alreadyExists = room.users.find(
            user=> user.userId === socket.user.id
        )

        if(!alreadyExists){
            
            
            room.users.push({
                socketId:socket.id,
                userId:socket.user.id,
                username:socket.user?.name,
                //activeFileId:null
            })
        }
        
        socket.data.joinedRooms.add(roomId);


        //const rediskey = `file:${fileId}`;
        socket.emit("file-init",{
            fileId,
            code:  ""
        })
        //send updated users list to everyone in room

        io.to(roomId).emit("room-users",room.users);

        //notify others
        socket.to(roomId).emit("user-joined",{
            socketId:socket.id,
            username:socket.user?.name
        });
        console.log(`${socket.user.name} joined room ${roomId}`);
    })

    //leave room
    socket.on("leave-room", ({ roomId }) => {
  socket.leave(roomId);

  const room = roomUsers.get(roomId)

  // remove from your custom state
  room.users = room.users.filter(
    user => user.socketId !== socket.id
  );

  // notify others
  io.to(roomId).emit("user-left", {
        socketId:socket.id,
        username:socket.user?.name
  }
    
  );
});
    //Disconnect

    socket.on("disconnect",()=>{
        for(const roomId of socket.data.joinedRooms || []){

            const room = roomUsers.get(roomId)
            if(!room) continue;

            room.users = room.users.filter(
                user=>user.socketId !== socket.id
            )
             
            //notify others in room
            socket.to(roomId).emit("user-left",{
                socketId:socket.id,
                username:socket.user?.name
            }) 
            //update room users list
            io.to(roomId).emit("room-users",room.users)
            //cleanup : remove empty room
        if(room.users.length===0){
            roomUsers.delete(roomId);
        } ;
        }
        
    })
}