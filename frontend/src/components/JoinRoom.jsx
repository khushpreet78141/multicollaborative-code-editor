import React from 'react'
import { useState } from 'react';
import axiosClient from '../../axiosClient';
import { showError, showSuccess } from '../utils/Toast';
const JoinRoom = () => {
  const [inviteCode, setinviteCode] = useState("");
  const [inviteLink, setinviteLink] = useState("");
  const joinRoom = async()=>{
    try{


    if (!inviteCode.trim() && !inviteLink.trim()) {
  alert("Please enter invite code or link");
  return;
}
    let finalCode = inviteCode;
    if(inviteLink.trim() && !inviteCode.trim()){
      finalCode = inviteLink.split("/").pop();
      
    }
      const res = await axiosClient.post("/addMember",{
        inviteCode:finalCode,
        
      }); 
      showSuccess("room joined successfully")
       }catch(err){
        console.error(err)
        showError(err.response?.data?.message)
      }


  }
  return (
    <div>
      <div className='fixed inset-0 bg-black/60 backdrop-blur-md flex   z-50'>
      <div className='bg-gray-900 border border-white/10 w-full h-52 rounded-4xl m-4'>
          <h1>Ready to Collaborate</h1>
          <h1> You can jump into a room using an invite code</h1>
          <input type="text" onChange={(e)=>setinviteCode(e.target.value)}/>
          <input type="text" onChange={(e)=>setinviteLink(e.target.value)}/>

          <button onClick={joinRoom}>Join Room</button>
      </div>
      <div>
        <h1> 🌍 Ongoing public rooms</h1>
        <div>

        </div>
      </div>
      </div>


    </div>
  )
};

export default JoinRoom
