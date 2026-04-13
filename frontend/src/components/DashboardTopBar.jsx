import React, { useEffect } from 'react'
import { useRoom } from '../context/RoomContext'
import axiosClient from '../../axiosClient'
const DashboardTopBar = () => {
  const {roomId} = useRoom()
  const [roomDetails, setRoomDetails] = useState({})
  const inviteCode = roomDetails.inviteCode
  const inviteLink =  `${window.location.origin}/addMember/${inviteCode}`;
  useEffect(() => {
    const getDetails = async()=>{
      try{
         const res = await axiosClient.get(`/roomId/${roomId}`)
       setRoomDetails(res.data)
      }catch(err){
        console.error(err);

      }
    }
    getDetails();
  }, [roomId]);

  const handleLeave = ()=>{

    socket.emit("leave-room",{roomId});
    
  }


  
  return (
    
      <nav>
        <h1>roomId:{roomDetails._id}</h1>
        <h2>copyLink:{inviteLink}</h2>
        <h2>copyInviteCode:{inviteCode}</h2>
        <button onClick={handleLeave}>Leave</button>
      </nav>
    
  )
}

export default DashboardTopBar
