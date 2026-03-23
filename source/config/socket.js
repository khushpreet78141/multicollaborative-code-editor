import { Server } from 'socket.io';
import registerSocketHandlers from '../../sockets/socketHandler.js'
const initSocket = (server)=>{
    const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
})
registerSocketHandlers(io)
}


export default initSocket;