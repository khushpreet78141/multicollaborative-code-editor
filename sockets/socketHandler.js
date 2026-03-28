import registerRoomEvents from './roomSockets.js';
import registerCodeChangeEvents from './codeChangeSockets.js';
import generateCursorMoveEvents from './cursorMoveSocket.js';
import fileSockets from './fileSockets.js';
import chatSocket from './chatSockets.js';
import socketAuth from '../source/middleware/socketAuth.js';

async function registerSocketHandlers(io){
    
    io.use(socketAuth);
  
    const roomUsers = new Map();
    io.on("connection",(socket)=>{
        // console.log("Connected:", socket.id);
        socket.data.joinedRooms = new Set();
        registerRoomEvents(io,socket,roomUsers);
        registerCodeChangeEvents({socket,io,roomUsers});
        generateCursorMoveEvents({io,socket,roomUsers});
        fileSockets({io,socket});
        chatSocket({socket});
          // 🔥 GLOBAL EVENT LOGGER
  socket.onAny((event, ...args) => {
    console.log(`📡 Event received: ${event}`, args);
  });
        //console.log("Authenticated user connected ",socket.user);
       
        socket.on("disconnect",()=>{
            console.log("User disconnected:",socket.user?.id);
        });

    });
};

export default registerSocketHandlers;
