import React from 'react'
import axiosClient from '../../axiosClient.js'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { showError, showSuccess } from "../utils/Toast";
const AllJoinedRooms = () => {
  const [rooms, setrooms] = useState([])
  const [loading, setloading] = useState(true);
  const [showMembers, setShowMembers] = useState(false);
  const [members, setMembers] = useState([])
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchRooms = async()=>{
      try{
         const res = await axiosClient.get("/room/listRooms");
        setrooms(res.data.rooms);
      }catch(err){
        console.error(err);
      }finally{
        setloading(false)
      }
       
    }
    fetchRooms();
  }, []);
  const joinedRooms = rooms.filter(room=>room.role === "owner");

  const handleGetMembers = async(roomId)=>{
    setShowMembers(true);
    try{
      const res = await axiosClient.get(`/room/ownerRoom/listAllMembers/${roomId}`)
      console.log(res)
      setMembers(res.data.data);

    }catch(err){
      showError(`Error ${err}`)
    }
    //navigate(`/memberDetails/${roomId}`);
  }
  // 🔄 Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-400">
        <div className="animate-pulse text-lg">Loading your rooms...</div>
      </div>
    );
  }

 // 📭 Empty State
  if (joinedRooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
        <h2 className="text-xl mb-2">No rooms joined yet</h2>
        <p className="text-sm">Join a room using an invite code to get started</p>
      </div>
    );
  }

   // 📭 Empty State
  if (joinedRooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
        <h2 className="text-xl mb-2">No rooms Created yet</h2>
        <p className="text-sm">Create a room and invite others to get started</p>
      </div>
    );
  }

  

  //changing role
  const handleChangeRole = async(memberId,value,roomId)=>{
    try{
      setMembers(prev=>prev.map(member=>member.memberId._id === memberId ? {...member,role : value}:member))
      const result = await axiosClient.put(`/room/${roomId}/members/${memberId}/role`,{
        role:value
    })
    showSuccess(`Role : ${result.data.message}`)
    
    }catch(err){
      console.log(err);
      showError(`Error :${err.message}`);
    }
    
   
  }

  //removing member
  const handleRemoveMember = async(memberId,roomId)=>{
    try{
      console.log("memberId in frontend",memberId);
      const result = await axiosClient.delete(`/room/removeMember/${roomId}/members/${memberId}`)
      
      showSuccess(`${result.data.message}`)
      setMembers(prev=>prev.filter(member=>member.memberId._id!==memberId));
    }catch(err){
      showError(`${err.message}`)
    }
  }

  //filtering members
  let FilterMembers = members.filter(member=>member.role!=="owner")
  
  return (
    <>

   { showMembers ? (<div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
      
      {/* Modal */}
      <div className="bg-[#0f172a] text-white w-[90%] max-w-3xl rounded-2xl shadow-xl p-6">
        
        {/* Header */}
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Members Details
        </h2>

        {/* Members List */}
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {FilterMembers.map((item, index) => (
            
            <div
              key={index}
              className="flex justify-between items-center bg-[#1e293b] p-4 rounded-xl"
            >
              
              {/* Left Section */}
              <div>
                <p className="font-medium text-lg">
                  {item.memberId.username}
                </p>
                <p className="text-sm text-gray-400">
                  Joined: {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-3">
                
                {/* Role Dropdown */}
                <select
                  value={item.role}
                  onChange={(e) =>
                    handleChangeRole(item.memberId._id, e.target.value,item.roomId)
                  }
                  className="bg-[#0f172a] border border-gray-600 text-sm rounded-lg px-2 py-1 outline-none"
                >
                  <option value="viewer">Viewer</option>
                  <option value="editor">Editor</option>
                  <option value="owner">Owner</option>
                </select>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveMember(item.memberId._id,item.roomId)}
                  className="bg-red-500/20 text-red-400 px-3 py-1 rounded-lg text-sm hover:bg-red-500/30 transition"
                >
                  Remove
                </button>

              </div>

            </div>

          ))}
        </div>

      </div>
    </div>) 
   : 
    (<div className=" inset-0 bg-black/60 backdrop-blur-md flex  z-50">
          
          
    <div className="p-6 text-white">
      <h2 className="text-2xl font-semibold mb-6">Your Own Rooms</h2>
      <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-10 p-6">
        {joinedRooms.map((m) => (
          <div
            key={m.roomId}
            className="bg-gradient-to-br from-[#1e1e2f] to-[#2a2a40] 
                       p-5  rounded-2xl shadow-lg 
                       hover:shadow-xl hover:scale-[1.02] 
                       transition duration-300 border border-gray-800"
          >

            {/* Title */}
            <h3 className="text-xl font-bold mb-2">{m.title}</h3>

            {/* Visibility */}
            <p className="text-sm text-gray-400 mb-3">
              Visibility:{" "}
              <span className="text-gray-200 capitalize">
                {m.visibility}
              </span>
            </p>

            {/* Role Badge */}
            <span className="inline-block px-3 py-1 text-xs rounded-full bg-blue-600 mb-4">
              {m.role}
            </span>
            <span>
              <button onClick={()=>handleGetMembers(m.roomId)} className='text-[13px] bg-purple-600 p-1 rounded-xl ml-3 hover:bg-purple-700 hover:transition-all hover:ease-in-out hover:duration-75 cursor-pointer'>View Members</button>
            </span>

            {/* Action Button */}
            <button
              onClick={() => navigate(`/room/${m.roomId}`)}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition-all py-3 rounded-xl font-medium shadow-lg"
            >
              Open Room
            </button>
             
          </div>
        ))}
      </div>
    </div>
    </div>)}</>
    //</div>
  )
}


export default AllJoinedRooms;
