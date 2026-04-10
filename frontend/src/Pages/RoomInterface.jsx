
import socket from "../utils/socket";
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import LiveMemberDetails from '../components/LiveMemberDetails';
import LiveEditor from '../components/LiveEditor';
import LiveChat from '../components/LiveChat';
import LiveFileTab from '../components/LiveFileTab';
import React, { useEffect, useState } from 'react'
import ResizeHandle from '.././utils/ResizeHandle';
import { useRoom } from "../context/RoomContext";
import { MousePointer2, TextCursor } from "lucide-react";


const RoomInterface = () => {
  const { roomId } = useParams();
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [chatWidth, setChatWidth] = useState(280);
  const { cursors, position, currentUserId } = useRoom();

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
        <div className="flex-1 text-white">
          ...

          {cursors.filter(c => c.userId !== currentUserId).map((cursor) => (
            <div key={cursor.userId} className={`absolute bg-[${cursor.color}] text-black z-50 pointer-events-none ${cursor.color} 
          
            `}
              style={{
                top: cursor.col,
                left: cursor.row,

              }}
            >


              <div className="w-2 h-2 rounded-full bg-white absolute left-[-2px] top-[-2px] text-white">
                <MousePointer2 />
              </div>
              <span style={{
                backgroundColor: cursor.color,
                position: 'absolute',
                left: '23px',
                borderTopRightRadius: '5px',
                borderBottomLeftRadius: '5px'
              }}>
                {cursor.userName}
              </span>
            </div>
          ))}
          {/* {/* {console.log("cursors", cursors)} */}

          {position.x} {position.y}
        </div>

        <div
          style={{ width: chatWidth }}
          className="h-full border-r border-white/10"
        >
          <LiveChat />
        </div>

      </div>
    </>
  );
};

export default RoomInterface;

