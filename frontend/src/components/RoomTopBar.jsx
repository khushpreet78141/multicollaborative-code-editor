import React, { useEffect } from 'react'
import { useRoom } from '../context/RoomContext'
import axiosClient from '../../axiosClient'
import { useState } from 'react'
import { CheckCheck,Copy, LeafyGreen } from 'lucide-react'
import { showSuccess } from '../utils/Toast'
import socket from '../utils/socket'
import { useNavigate } from 'react-router-dom'
const RoomTopBar = () => {
  const {roomId} = useRoom()
  const [roomDetails, setRoomDetails] = useState({});
  const [copied, setCopied] = useState("");
  const inviteCode = roomDetails.inviteCode
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

  const handleLeave = ()=>{
    socket.emit("leave-room",{roomId}); 
    console.log("emit leave user event");
    navigate('/dasboard');
  }

  return (
    
      <nav className='text-white flex justify-evenly relative z-100 bg-white/5 border-2 border-white/10  border-b-blue-800  p-2 items-center'>
        <p> Title : {roomDetails.title}</p>
        <p>👑 Owner : {roomDetails.owner?.username}</p>
        {/*<h2>copyLink: <button onClick={()=>handleCopy("link")}>{copied?<CheckCheck size={16}/>:<Copy size={16}/>}</button></h2>*/}
        <h2> InviteCode : {inviteCode} <button onClick={()=>handleCopy("code")}>{copied==="code"? <CheckCheck className='text-green-500' size={16}/>:<Copy size={16}/>}</button></h2>
        <button onClick={handleLeave} className='bg-red-800 py-1 rounded-xl px-3'>Leave</button>
      </nav>
  )
}


export default RoomTopBar
