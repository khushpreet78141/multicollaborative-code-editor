import React from 'react'
import { useRoom } from '../context/RoomContext'
import socket from '../utils/socket'

const LiveMemberDetails = () => {
  const {members,setMembers} = useRoom()
  
  
  return (
    <div>
      
    </div>
  )
}

export default LiveMemberDetails
