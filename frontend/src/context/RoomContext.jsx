// RoomContext.js
import { createContext, useContext, useState } from "react";
import socket from "../utils/socket";
import { useParams } from "react-router-dom";
import { showInfo } from "../utils/Toast";
import { useEffect } from "react";
const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const {roomId} = useParams()
  const [members, setMembers] = useState([]);
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [code, setCode] = useState("");

//useffect for connection

useEffect(() => {
  socket.connect();

  const handleConnect = () => {
    socket.emit("join-room", {
      roomId,
      fileId: activeFile,
    });
  };

  socket.on("connect", handleConnect);

  return () => {
    socket.off("connect", handleConnect);
    socket.disconnect();
  };
}, [roomId]);


//handling activefiles changes
useEffect(() => {
  if (!roomId || !activeFile) return;

  socket.emit("join-room", {
    roomId,
    fileId: activeFile,
  });
}, [activeFile]);


//useEffect for listeners
useEffect(() => {
  const handleUserJoined = (data)=>{
    showInfo(`${data.username} has joined the room .`);
  }
  const handleUserLeft = (data)=>{
    showInfo(`${data.username} has left the room .`)
  }

  const handleRoomUsers = (data) =>{
    setMembers(data)
  }

  socket.on("user-joined",handleUserJoined);
  socket.on("user-left",handleUserLeft);
  socket.on("room-users",handleRoomUsers);

  return () => {
    socket.off("user-joined", handleUserJoined);
    socket.off("user-left", handleUserLeft);
    socket.off("room-users", handleRoomUsers);
  }
}, [])


//file initializing
useEffect(() => {

  const handleFileInit = ({ fileId, code }) => {
    setActiveFile(fileId);
    setCode(code);
  };

  socket.on("file-init", handleFileInit);

  return () => {
    socket.off("file-init", handleFileInit);
  };

}, []);


  return (
    <RoomContext.Provider
      value={{
        members,
        setMembers,
        files,
        setFiles,
        activeFile,
        setActiveFile,
        messages,
        setMessages,
        code,
        setCode,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

// custom hook

export const useRoom = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("useRoom must be used within a RoomProvider");
  }
  return context;
};


// ---------------- USAGE ----------------

// Wrap your RoomInterface (or App level)
//
// <RoomProvider>
//    <RoomInterface />
// </RoomProvider>


// Example inside any component:
//
// import { useRoom } from "../context/RoomContext";
//
// const Editor = () => {
//   const { code, setCode } = useRoom();
//
//   return (
//     <textarea
//       value={code}
//       onChange={(e) => setCode(e.target.value)}
//     />
//   );
// };
