
import React, { useState, useEffect } from "react";
import axiosClient from "../../axiosClient";
import { showError, showSuccess } from "../utils/Toast";
import { Users, Link2, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JoinRoom = () => {
  const [inviteCode, setInviteCode] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [publicRooms, setPublicRooms] = useState([]);
  const [loading, setloading] = useState(false)
  const navigate = useNavigate()
  const extractCodeFromLink = ()=>{
    return inviteLink.split("/").pop();
  }
  // let finalCode =
  //inviteCode.trim() ||
  //(inviteLink.trim() ? extractCodeFromLink(inviteLink) : "");
  
  const joinRoom = async (codeFromButton,roomId) => {

   
      let code = codeFromButton;

  if (!code) {
    const extracted = inviteCode.trim() || 
      (inviteLink.trim() ? extractCodeFromLink() : "");

    if (!extracted) {
      showError("Enter invite code or valid link");
      return;
    }

      code = extracted;

    }

      try {
      setloading(true)
      
      const res = await axiosClient.post("/room/addMember", {
        inviteCode: code,
      }); 

      showSuccess("Joined room successfully ");
      navigate(`/room/${res.data.data.roomId}`);
    } catch (err) {
      console.error(err);
      showError(err.response?.data?.message || "Something went wrong");
    } finally{
      setloading(false)
    }
    
  };

  //const handleClick = async(Code)=>{
  //  try{
  //    const res = await axiosClient.post("/room/addMember",{
  //      inviteCode:Code
  //    })
  //    showSuccess("Joined room successfully ");

  //  }catch(err){
  //    console.error(err);
  //    showError(err.response?.data?.message || "Something went wrong")
  //  }
  
  //}


  useEffect(() => {
    const getRooms = async () => {
      try {
        const res = await axiosClient.get("/room/publicRoom");
        setPublicRooms(res.data.data);
        
      } catch (err) {
        console.error(err);
      }
    };

    getRooms();
  }, []);
  //console.log(publicRooms);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center p-6">
      {/* JOIN CARD */}
      <div className="w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6 mb-8">
        <h1 className="text-2xl font-semibold mb-2">Ready to Collaborate</h1>
        <p className="text-gray-400 text-sm mb-6">
          Enter an invite code or paste a room link to join instantly.
        </p>

        <div className="space-y-4">
          {/* Invite Code */}
          <div className="flex items-center bg-black/40 border border-white/10 rounded-xl px-3">
            <KeyRound className="w-4 h-4 text-gray-400" />
            <input disabled={inviteLink.length>0}
              type="text"
              placeholder="Enter invite code"
              className="w-full bg-transparent outline-none p-3 text-sm"
              onChange={(e) => setInviteCode(e.target.value)}
            />
          </div>

          {/* Invite Link */}
          <div className="flex items-center bg-black/40 border border-white/10 rounded-xl px-3">
            <Link2 className="w-4 h-4 text-gray-400" />
            <input 
              type="text" disabled={inviteCode.length>0}
              placeholder="Paste invite link"
              className="w-full bg-transparent outline-none p-3 text-sm"
              onChange={(e) => setInviteLink(e.target.value)}
            />
          </div>

          <button
            onClick={()=>joinRoom(inviteCode)}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition-all py-3 rounded-xl font-medium shadow-lg"
          disabled={loading}>
            Join Room
          </button>
        </div>
      </div>

      {/* PUBLIC ROOMS */}
      <div className="w-full max-w-4xl">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" /> Ongoing Public Rooms
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {publicRooms.map((room, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-indigo-500 transition-all"
            >
              <h3 className="font-medium text-lg">{room.title}</h3>

              <p className="text-gray-400 text-sm mt-1">
                Owner: {room.owner.username}
                
              </p>

              <p className="text-gray-500 text-xs mt-1">
                {new Date(room.createdAt).toLocaleString()}
              </p>

              <button
                onClick={()=>joinRoom(room.inviteCode,room._id)}
                className="mt-4 w-full bg-white/10 hover:bg-white/20 py-2 rounded-lg text-sm"
              >
                Quick Join
              </button>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;

