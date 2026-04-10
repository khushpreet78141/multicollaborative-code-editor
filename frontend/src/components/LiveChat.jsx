import React from "react";
import { useRoom } from "../context/RoomContext";
import { SendHorizonal, User2 } from "lucide-react";
import { useState } from "react";

const LiveChat = () => {
  const { messages, sendMessage,setothersMessage,othersMessage } = useRoom();
  const [message, setMessage] = useState([]);

  console.log("the other messages ",othersMessage);
  
  return (
    <div className="relative bg-[#0f172a] border border-white/10 w-full h-[600px] min-h-0 flex flex-col p-4 rounded-2xl shadow-lg">

      {/* Header */}
      <h2 className="text-white text-lg font-semibold mb-4 tracking-wide">
        Chatting
      </h2>
      <div className="w-full h-[450px]   overflow-auto flex flex-col justify-start gap-3">
        {messages.map((msg, index) => {
          return (

            <div key={msg._id} className="w-full flex justify-start text-white gap-3 ">
              <div className="w-[50px] h-[50px] rounded-full border-1 flex items-center justify-center">
                <User2 />
              </div>
              <div className="flex flex-col justify-start">
                <strong>{msg.senderId.username}</strong>
                <p>{msg.text}</p>
              </div>
            </div>

          );
        })}
      </div>

    
      {/* Members List */}
      <div className="flex flex-col gap-3">

        <div className="absolute bottom-1 w-[90%] flex justify-around">
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Type a message..." className="w-[70%] p-2 rounded-xl bg-white/5 border border-white/10 text-white" />
          <button
            onClick={() => {
              sendMessage(message);
              setMessage('');
            }}
            className="w-[20%] p-2 rounded-xl bg-white/5 border border-white/10 text-white"><SendHorizonal /></button>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
