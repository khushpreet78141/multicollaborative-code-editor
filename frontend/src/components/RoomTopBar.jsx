import React, { useEffect } from 'react'
import { useRoom } from '../context/RoomContext'
import axiosClient from '../../axiosClient'
import { useState } from 'react'
import { CheckCheck,Copy, LeafyGreen } from 'lucide-react'
import { showSuccess } from '../utils/Toast'

import { useNavigate } from 'react-router-dom'
const RoomTopBar = () => {
  const {roomId,socket} = useRoom()
  const [roomDetails, setRoomDetails] = useState({});
  const [copied, setCopied] = useState("");
  const [leaving, setLeaving] = useState(false)
 

  
  const navigate = useNavigate();
  //const inviteLink =  `${window.location.origin}/addMember/${inviteCode}`;

  useEffect(() => {
    const getDetails = async()=>{
      try{
      const res = await axiosClient.get(`/room/roomDetails/${roomId}`);
      setRoomDetails(res.data.room);
      }catch(err){
        console.error(err);
      }
    }
    getDetails();
  }, [roomId]);

  
  const inviteCode = roomDetails.inviteCode
  const handleCopy = async(type)=>{
    if(type==="code"){
      await navigator.clipboard.writeText(`${inviteCode}`);
      showSuccess("Code copied successfully !");
      setCopied("code");
      setTimeout(() => {
        setCopied("");
      }, 1500);
    }
  }

  const handleLeave = ()=> {
    console.log("leave button");
    const confirmed = window.confirm("are you sure to leave the Room ?")
    if(!confirmed) return;
    socket.emit("leave-room",{roomId}); 
    setLeaving(true);
    socket.off("cursor-update");
    socket.off("code-change");
    console.log("emit leave user event");

    navigate('/dasboard');

  }
   

  return (
    
      <nav className="w-full text-white flex items-center justify-between px-6 py-3 
  bg-[#0f172a]/80 backdrop-blur-md border-b border-white/10 shadow-sm">
   

  {/* LEFT */}
  <div className="flex items-center gap-6">
    <h1 className="text-lg font-semibold tracking-wide">
      {roomDetails.title}
    </h1>

    <div className="flex items-center gap-2 text-sm text-gray-400">
      <span>👑</span>
      <span>{roomDetails.owner?.username}</span>
    </div>
  </div>

  {/* CENTER */}
  <div className='flex items-center gap-30'>
  <div className="flex items-center gap-3 bg-[#1e293b] px-4 py-2 rounded-xl border border-white/10">
    <span className="text-sm text-gray-400">Invite Code</span>
    
    <span className="font-mono tracking-wider text-white">
      {inviteCode}
    </span>

    <button
      onClick={() => handleCopy("code")}
      className="ml-2 p-1 rounded-md hover:bg-white/10 transition"
    >
      {copied === "code" ? (
        <CheckCheck size={16} className="text-green-400" />
      ) : (
        <Copy size={16} />
      )}
    </button>

   
     
  </div>
   <button
      onClick={handleLeave}
      disabled={leaving}
      className="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-4 py-1.5 rounded-lg text-sm transition"
    >
     
      {leaving ? <lord-icon
    src="https://cdn.lordicon.com/euaablbm.json"
    trigger="loop"
    stroke="bold"
    state="loop-cycle"
    colors="primary:#e4e4e4,secondary:#8930e8"
    style="width:250px;height:250px">
</lord-icon> : "Leave"}
    </button>
  </div>
      
  {/* RIGHT */}
  <div className="flex items-center gap-3">

    {/*Leave Button*/}
   

  </div>
</nav>
  )

}


export default RoomTopBar
