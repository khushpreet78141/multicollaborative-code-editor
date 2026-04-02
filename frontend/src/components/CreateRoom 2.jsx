import React, { useState } from "react";
import { X, Copy, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { showSuccess,showError,showInfo } from "../utils/Toast";
import axiosClient from "../../axiosClient";
const CreateRoom = () => {
  
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [copied, setCopied] = useState("");
  const [visibility, setvisibility] = useState("public"); 
  const [roomId, setroomId] = useState("")
  const navigate = useNavigate();
  const handleCreate = async () => {
    if (!title) return;
    const res = await axiosClient.post("/room",{
      title,visibility
    });
    console.log(res.data);
     setroomId(res.data.roomId)
    setStep(2);
    showSuccess("Room created successfully !");
    if(visibility==="private"){
      setInviteCode(res.data.inviteCode);
    }
  };
  const inviteLink =  `${window.location.origin}/join/${roomId}`;
  
  const copy = (text, type) => {
    navigator.clipboard.writeText(text);
    showSuccess("Text successfully copied to clipboard !");
    setCopied(type);
    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <div className="flex justify-center items-center h-full">

      {/* MODAL */}
     
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50">
          
          <div className="w-full max-w-md bg-gray-900 border border-white/10 rounded-2xl p-6 relative shadow-2xl">
   
            {/* Step Indicator */}
            
            <div className="flex items-center justify-between mb-6 text-sm">
              <span className={step === 1 ? "text-indigo-400" : "text-gray-500"}>
                1. Create
              </span>
              <span className="flex-1 h-[1px] bg-gray-700 mx-2"></span>
              <span className={step === 2 ? "text-indigo-400" : "text-gray-500"}>
                2. Share
              </span>
            </div>
            
            {/* STEP 1 */}
{step === 1 && (
  <>
    <h2 className="text-xl font-semibold mb-2">
      Create Room
    </h2>
    <p className="text-gray-400 text-sm mb-4">
      Give your room a name and choose who can join.
    </p>

    {/* Room Title */}
    <input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Room Title..."
      className="w-full p-3 rounded-xl bg-black/40 border border-white/10 mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
    />

    {/* Visibility Dropdown */}
    <div className="mb-4">
      <label className="text-xs text-gray-400 mb-1 block">
        Visibility
      </label>

      <select
        value={visibility}
        onChange={(e) => setvisibility(e.target.value)}
        className="w-full p-3 rounded-xl bg-black/40 border border-white/10 focus:ring-2 focus:ring-indigo-500 outline-none"
      >
        <option value="private">🔒 Private (Invite Only)</option>
        <option value="public">🌐 Public (Anyone can join)</option>
      </select>
    </div>

    {/* Helper Text */}
    <p className="text-xs text-gray-500 mb-4">
      {visibility === "private"
        ? "Only users with invite code/link can join."
        : "Anyone can discover and join this room."}
    </p>

    {/* Continue Button */}
    <button
      onClick={handleCreate}
      className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition"
    >
      Continue →
    </button>
  </>
)}

{/* step 2 ui for public room */}
            {step === 2 && visibility === "public" && (
  <>
    <h2 className="text-xl font-semibold mb-2">
      Room Ready 🚀
    </h2>

    <p className="text-gray-400 text-sm mb-6">
      Your public room is ready. Anyone can join.
    </p>

    <button
      onClick={() => navigate(`/room/${roomId}`)}
      className="w-full py-3 rounded-xl bg-green-500/80 hover:bg-green-500"
    >
      Enter Room →
    </button>
  </>
)}

            {/* STEP 2 */}
            {(step === 2 && visibility==="private")&& (
              <>
                <h2 className="text-xl font-semibold mb-2">
                  Invite your team 
                </h2>

                {/* Code */}
                <div className="mb-4">
                  <p className="text-xs text-gray-400 mb-1">Invite Code</p>
                  <div className="flex justify-between items-center bg-black/40 p-3 rounded-xl border border-white/10">
                    <span className="font-mono">{inviteCode}</span>
                    <button onClick={() => copy(inviteCode, "code")}>
                      {copied === "code" ? <Check size={16}/> : <Copy size={16}/>}
                    </button>
                  </div>
                </div>

                {/* Link */}
                <div className="mb-6">
                  <p className="text-xs text-gray-400 mb-1">Invite Link</p>
                  <div className="flex justify-between items-center bg-black/40 p-3 rounded-xl border border-white/10">
                    <span className="text-xs truncate mr-2">
                      {inviteLink}
                    </span>
                    <button onClick={() => copy(inviteLink, "link")}>
                      {copied === "link" ? <Check size={16}/> : <Copy size={16}/>}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/room/${roomId}`)}
                  className="w-full py-3 rounded-xl bg-green-500/80 hover:bg-green-500"
                >
                  Enter Room →
                </button>
              </>
            )}
          </div>
        </div>

    </div>
  );
};

export default CreateRoom;
