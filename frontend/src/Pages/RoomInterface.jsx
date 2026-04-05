import React from 'react'
import socket from "../utils/socket";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const RoomInterface = () => {
    const {roomId} = useParams()
    
    useEffect(() => {
      console.log("Connecting to:", socket.io.uri);
      socket.connect();
      socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
      socket.emit("join-room",{
            roomId,
            user:{
                name:"Khushpreet"
            }
        });

    });

        
      return () => {
        socket.emit("leave-room",roomId);
        socket.disconnect();
        socket.off("connect");
      }
    }, [roomId]);

  return (
    <div>
      <h1>Room interface</h1>
    </div>

  )
}

export default RoomInterface
