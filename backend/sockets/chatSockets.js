import Chat from "../source/models/chatSchema.js"

export default function chatSocket({socket}){

    socket.on("send-message",async({roomId,text})=>{
        
        if(!roomId || !text?.trim()) return;
        if(!socket.rooms.has(roomId)) return;

        const message = await Chat.create({
            roomId,
            senderId:socket.user.id,
            text:text.trim()
        })
        //broadcast to all other room members
        socket.to(roomId).emit("receive-message",message)

        //back to sender
        socket.emit("receive-message",message)
    })

    socket.on("get-messages",async({roomId})=>{
        if(!roomId) return;
        if(!socket.rooms.has(roomId)) return;
        const messages = await Chat.find({roomId}).sort({createdAt:1}).limit(50)
                                    .populate("senderId","username");
        socket.emit("receive-all-messages",messages.reverse());   
    });
}