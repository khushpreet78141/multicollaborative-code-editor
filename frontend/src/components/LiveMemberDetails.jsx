import React from 'react'
import  {useRoom} from '../context/RoomContext'
import socket from '../utils/socket'

const LiveMemberDetails = () => {
  const {members,setMembers} = useRoom()
  
  console.log(members)
  return (
    <div>
      {members.map((member,index)=>{

        return (
          <div key={index}>
          <div>avatar</div>
          <h1>{member.username}</h1>
          <p>{member.activeFileId}</p>
          <p></p>
          </div>
        )
      })}
    </div>
  )
}

export default LiveMemberDetails
