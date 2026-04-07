import React, { useEffect } from 'react'
import socket from "../utils/socket";
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import LiveMemberDetails from '../components/LiveMemberDetails';
import LiveEditor from '../components/LiveEditor';
import LiveChat from '../components/LiveChat';
import LiveFileTab from '../components/LiveFileTab';
import showInfo from '../utils/Toast';

const RoomInterface = () => {
  const { roomId } = useParams();
//  const {activeFile,setActiveFile} = useRoom()
//  useEffect(() => {
//    socket.connect();

//    socket.on("connect", () => {
//      socket.emit("join-room", { roomId });
//    });
//    socket.on("user-joined", (data) => {showInfo(`${data.username} has joined`)});
//socket.on("user-left", (data) => {showInfo(`${data.username} has left`) });

//    return () => {
//      socket.emit("leave-room", roomId);
//      socket.disconnect();
//      socket.off("connect");
      
//    };
//  }, [roomId]);

  return (
    <>
    <LiveMemberDetails/>
    <LiveEditor/>
    <LiveChat/>
    <LiveFileTab/>
  
    </>
    
  );
};

export default RoomInterface;

