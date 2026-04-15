import Chat from "../source/models/chatSchema.js"

export default function chatSocket({ io, socket }) {

    socket.on("send-message", async ({ roomId, msg }) => {
        const text = msg;
        if (!roomId || !msg?.trim()) return;
        if (!socket.rooms.has(roomId)) return;
        const message = await Chat.create({
            roomId,
            senderId: socket.user.id,

            text: text.trim()
        })

        const newMsg = await Chat.findById(message._id)
            .populate("senderId", "username")

        //send to everyone
        io.to(roomId).emit("receive-message", newMsg);
    })

    
    socket.on("get-messages", async ({ roomId }) => {
        if (!roomId) return;
        if (!socket.rooms.has(roomId)) return;
        const messages = await Chat.find({ roomId }).sort({ createdAt: 1 }).limit(50)
            .populate("senderId", "username");
            
        socket.emit("receive-all-messages", messages);
    });

}

