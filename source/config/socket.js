
import { Server } from 'socket.io';
import registerSocketHandlers from '../../sockets/socketHandler.js'
const initSocket = (server)=>{
    console.log("🔥 initSocket CALLED");
    const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})
registerSocketHandlers(io)
}

export default initSocket;