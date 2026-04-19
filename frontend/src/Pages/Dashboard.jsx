import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import CreateRoom from '../components/CreateRoom';
import JoinRoom from '../components/JoinRoom';
import OwnRooms from '../components/OwnRooms';
import AllJoinedRooms from '../components/AllJoinedRooms';
import {
  User,
  LogOut,
  Settings,
  LayoutDashboard,
  PlusCircle,
  Users,
  DoorOpen,
} from "lucide-react";

const Dashboard = () => {
  const [activeSection, setactiveSection] = useState("createRoom");
  const [showProfile, setShowProfile] = useState(false);

  const menuItems = [
    { id: "createRoom", label: "Create Room", icon: <PlusCircle size={18} /> },
    { id: "joinRoom", label: "Join Room", icon: <DoorOpen size={18} /> },
    { id: "ownRooms", label: "Your Rooms", icon: <LayoutDashboard size={18} /> },
    { id: "joinedRooms", label: "Joined Rooms", icon: <Users size={18} /> },
  ];

  return (
    <>
     <div className="flex h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white">
      
      {/* Sidebar */}
      <div className="w-1/4 backdrop-blur-xl bg-white/5 border-r border-white/10 p-6 flex flex-col justify-between">
        
        {/* Top Section */}
        <div>
          {/* Branding / Hero Text */}
          <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            CodeSync
          </h1>
          <p className="text-sm text-gray-400 mb-8">
            Build, collaborate, and code in real-time with your team.
          </p>

          {/* Menu */}
          <div className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setactiveSection(item.id)}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200
                ${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg"
                    : "hover:bg-white/10"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Profile Section */}
        <div className="relative">
          <div
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-white/10 transition"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
              <User size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold">Khushpreet</p>
              <p className="text-xs text-gray-400">View Profile</p>
            </div>
          </div>

          {/* Dropdown */}
          {showProfile && (
            <div className="absolute bottom-16 left-0 w-full bg-gray-900 border border-white/10 rounded-xl shadow-xl p-3 flex flex-col gap-2">
              <button className="flex items-center gap-2 hover:bg-white/10 p-2 rounded-lg">
                <User size={16} /> Profile
              </button>
              <button className="flex items-center gap-2 hover:bg-white/10 p-2 rounded-lg">
                <Settings size={16} /> Settings
              </button>
              <button className="flex items-center gap-2 hover:bg-red-500/20 text-red-400 p-2 rounded-lg">
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8 overflow-y-auto">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl min-h-full">
          
          {activeSection === "createRoom" && <CreateRoom />}
          {activeSection === "joinRoom" && <JoinRoom />}
          {activeSection === "ownRooms" && <OwnRooms />}
          {activeSection === "joinedRooms" && <AllJoinedRooms />}
        
        </div>
      </div>
    </div>
    </>

  )
}

export default Dashboard
