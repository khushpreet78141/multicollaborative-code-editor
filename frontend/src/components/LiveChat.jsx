import React from "react";
import { useRoom } from "../context/RoomContext";
import { SendHorizonal, User2 } from "lucide-react";
import { useState } from "react";

const LiveChat = () => {
  const { messages, sendMessage, setMessages, currentUserId } = useRoom();
  const [message, setMessage] = useState([]);
  console.log("hello yrr", messages[0]?.senderId._id);
  console.log("userId", currentUserId);

  return (
    <div className="relative bg-[#0f172a] border border-white/10 w-full h-[600px] min-h-0 flex flex-col p-4 rounded-2xl shadow-lg">

      {/* Header */}
      <h2 className="text-white text-lg font-semibold mb-4 tracking-wide">
        Chatting
      </h2>
      <div className="w-full h-[450px]   overflow-auto flex flex-col justify-start gap-3">
        {messages.map((msg, index) => {
          const initials = msg.senderId.username
            ?.split(" ")
            .map((w) => w[0])
            .join("")
            .toUpperCase();
          return (
            <>
              {currentUserId === msg.senderId._id ? <>
                <div className="rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/5 p-2 ml-10">
                  <div key={msg._id} className="w-full flex  justify-end items-center text-white  gap-4 overflow-auto">

                    <div className="flex flex-col justify-start  items-end  text-green-600 gap-1">
                      {/*<strong>{msg.senderId.username}</strong>*/}
                      <strong>You</strong>
                      <p className="text-gray-200 text-[14px]">{msg.text}</p>
                    </div>
                    <div className="flex flex-col justify-end items-end gap-4">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                          {initials}
                        </div>

                        {/* Online Indicator */}
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#0f172a] rounded-full"></span>
                      </div>
                    </div>
                  </div>
                  <small className="text-gray-500 text-[8px] flex justify-end">  {new Date(msg.createdAt).toLocaleString()}</small>
                </div>
              </> : <><div className="rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/5 p-1 px-2 mr-6">
                <div key={msg._id} className="w-full flex  justify-start items-center text-white gap-4 overflow-auto">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                      {initials}
                    </div>

                    {/* Online Indicator */}
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#0f172a] rounded-full"></span>
                  </div>
                  <div className="flex flex-col justify-start gap-1">
                    <strong>{msg.senderId.username}</strong>
                    <p className="text-gray-300 text-[14px]">{msg.text}</p>

                  </div>
                </div>
                <small className="text-[8px] text-gray-500">  {new Date(msg.createdAt).toLocaleString()}</small>
              </div>
              </>}
              </>

              );
        })}
              {/*{messages.map((msg, index) => {
                const initials = msg.senderId.username
                  ?.split(" ")
                  .map((w) => w[0])
                  .join("")
                  .toUpperCase();
                return (
                  <>
                    <div className="rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/5 p-2 ml-10">
                      <div key={msg._id} className="w-full flex  justify-end items-center text-white  gap-4 overflow-auto">

                        <div className="flex flex-col justify-start  items-end  text-green-600 gap-1">
                          {/*<strong>{msg.senderId.username}</strong>*/}
                          {/*<strong>You</strong>*/}
                          {/*<p className="text-gray-200 text-[14px]">{msg.text}</p>
                        </div>
                        <div className="flex flex-col justify-end items-end gap-4">
                          <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                              {initials}
                            </div>

                            {/* Online Indicator */}
                            {/*<span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#0f172a] rounded-full"></span>
                          </div>
                        </div>
                      </div>
                      <small className="text-gray-500 text-[8px] flex justify-end">  {new Date(msg.createdAt).toLocaleString()}</small>
                    </div>
                  </>
                );
              })}
            </div >*/}
            </div>




              {/* Members List */ }
              < div className = "flex flex-col gap-3" >

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
