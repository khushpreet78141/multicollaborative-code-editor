
import socket from "../utils/socket";
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import LiveMemberDetails from '../components/LiveMemberDetails';
import LiveEditor from '../components/LiveEditor';
import LiveChat from '../components/LiveChat';
import LiveFileTab from '../components/LiveFileTab';
import React, { useEffect, useState } from 'react'
import ResizeHandle from '.././utils/ResizeHandle';


const RoomInterface = () => {
  const { roomId } = useParams();
  const [sidebarWidth, setSidebarWidth] = useState(280);
  
  return (
    <>
 <div className="h-screen flex bg-[#020617] overflow-hidden">

  {/* Sidebar */}
  <div
    style={{ width: sidebarWidth }}
    className="h-full border-r border-white/10"
  >
    <LiveMemberDetails />
  </div>

  {/* Resize Handle */}
  <ResizeHandle setSidebarWidth={setSidebarWidth} />

  {/* Main */}
  <div className="flex-1">
    ...
  </div>
</div>
    </>    
  );
};

export default RoomInterface;

