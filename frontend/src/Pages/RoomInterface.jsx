
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
import { ArrowLeft, ArrowLeftSquare, ArrowRight, MousePointer2, TextCursor } from "lucide-react";


const RoomInterface = () => {
  const { roomId } = useParams();
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [chatWidth, setChatWidth] = useState(280);
  const { cursors, position, currentUserId } = useRoom();
  const [sideBarOpen, setSidebarOpen] = useState(true);
  const [chatOpen, setChatOpen] = useState(true);

  return (
    <>
      <div className="h-screen   bg-[#020617] overflow-hidden">


        {/* Sidebar */}
        <div className="fixed h-full"
          style={{
            width: sidebarWidth,
            top: 0,
            left: sideBarOpen ? 0 : "-100%",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <div
            style={{ width: sidebarWidth }}
            className="h-full border-r border-white/10"
          >
            <LiveMemberDetails />

          </div>

          {/* Resize Handle */}
          <ResizeHandle setSidebarWidth={setSidebarWidth} />
          <div className="fixed text-white h-full flex  flex-col items-center justify-center" style={{
            left: sideBarOpen ? sidebarWidth : "0",
            top: 0,
            transition: "all 0.3s ease-in-out",
          }} >
            <div onClick={() => setSidebarOpen(!sideBarOpen)} className="h-[100px] bg-white/20 flex flex-col justify-center items-center" style={{ borderTopRightRadius: 5, borderBottomRightRadius: 5 }}>
              {sideBarOpen ? <ArrowLeft className="text-white" onClick={() => setSidebarOpen(!sideBarOpen)} /> : <ArrowRight className="text-white" onClick={() => setSidebarOpen(!sideBarOpen)} />}
            </div>
          </div>
        </div>
        {/* Main */}
        <div className="flex-1 flex justify-center text-white">
          ...


        </div>
        <div className="fixed h-[600px]"
          style={{
            width: chatWidth,
            top: 0,
            right: chatOpen ? 0 : "-100%",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <div
            style={{ width: chatWidth }}
            className="h-full border-r border-white/10"
          >
            <LiveChat />
          </div>
          <div className="fixed text-white h-[600px] flex  flex-col items-center justify-center" style={{
            right: chatOpen ? chatWidth : "0",
            top: 0,
            transition: "all 0.3s ease-in-out",
          }} >
            <div onClick={() => setChatOpen(!chatOpen)} className="h-[100px] bg-white/20 flex flex-col justify-center items-center" style={{ borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>
              {chatOpen ? <ArrowRight className="text-white" onClick={() => setChatOpen(!chatOpen)} /> : <ArrowLeft className="text-white" onClick={() => setChatOpen(!chatOpen)} />}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default RoomInterface;

