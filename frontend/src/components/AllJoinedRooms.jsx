import React from 'react'
import axiosClient from '../../axiosClient.js'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
const AllJoinedRooms = () => {
  const [rooms, setrooms] = useState([])
  const [loading, setloading] = useState(true);
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
  const joinedRooms = rooms.filter(room=>room.role !== "owner");

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
        <h2 className="text-xl mb-2">No rooms joined yet</h2>
        <p className="text-sm">Join a room using an invite code to get started</p>
      </div>
    );
  }
  return (
    <div className=" inset-0 bg-black/60 backdrop-blur-md flex  z-50">
    <div className="p-6 text-white">
      <h2 className="text-2xl font-semibold mb-6">Joined Rooms</h2>
      <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-10 p-6">
        {joinedRooms.map((m) => (
          <div
            key={m.roomId}
            className="bg-gradient-to-br from-[#1e1e2f] to-[#2a2a40] 
                       p-5 rounded-2xl shadow-lg 
                       hover:shadow-xl hover:scale-[1.02] 
                       transition duration-300 border border-gray-800"
          >
            {/* Title */}
            <h3 className="text-xl font-bold mb-2">{m.title}</h3>

            {/* Owner */}
            <p className="text-sm text-gray-400 mb-1">
              Owner: <span className="text-gray-200">{m.ownerName}</span>
            </p>

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
    </div>
  )
}


export default AllJoinedRooms;

