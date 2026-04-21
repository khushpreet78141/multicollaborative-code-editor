import React from "react";
import { useRoom } from "../context/RoomContext";

const LiveMemberDetails = () => {
  const { members,currentUserId } = useRoom();



  return (
    <div className="bg-[#0f172a] border border-white/10 w-full h-full min-h-0 flex flex-col p-4 rounded-2xl shadow-lg">

      {/* Header */}
      <h2 className="text-white text-lg font-semibold mb-4 tracking-wide">
        Live Members
      </h2>

      {/* Members List */}
      <div className="flex flex-col gap-3">
        {members.map((member, index) => {
          const initials = member.username
            ?.split(" ")
            .map((w) => w[0])
            .join("")
            .toUpperCase();


          return (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/5"
            >
              {/* Avatar */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {initials}
                </div>

                {/* Online Indicator */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#0f172a] rounded-full"></span>
              </div>

              {/* User Info */}
              <div className="flex flex-col flex-1">
                <h3 className="text-white text-sm font-medium">
                  {member.userId===currentUserId ? <span className="text-green-500">You</span> : member.username}
                </h3>

                {/* Active File */}
                <p className="text-xs text-gray-400 truncate">
                  {member.activeFileId
                    ? `Editing: ${member.activeFileId}`
                    : "Idle"}
                </p>
              </div>
              {/* Activity Dot */}
              <div className="w-2 h-2 rounded-full bg-indigo-400 opacity-70"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LiveMemberDetails;
