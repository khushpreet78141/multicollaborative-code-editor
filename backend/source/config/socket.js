
import { Server } from 'socket.io';
import registerSocketHandlers from '../../sockets/socketHandler.js'
const initSocket = (server)=>{
    console.log("🔥 initSocket CALLED");
    const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true
    }
})
registerSocketHandlers(io);

}

export default initSocket;