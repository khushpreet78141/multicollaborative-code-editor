import { createContext, useContext, useState } from "react";
import socket from "../utils/socket";
import { useParams } from "react-router-dom";
import { showInfo } from "../utils/Toast";
import { useEffect } from "react";
import useFileSocket from '../hooks/useFileSocket.js'
import useRoomSocket from '../hooks/useRoomSocket.js'
const RoomContext = createContext();


const RoomProvider = ({ children }) => {
  const {roomId} = useParams()
  const [members, setMembers] = useState([]);
  const [files, setFiles] = useState([]);
  const [messages, setMessages] = useState([]);
  const [code, setCode] = useState("");
  const [activeFileId, setActiveFileId] = useState(null);

//attaching socket logic 
  useFileSocket({
    roomId,
    setFiles,
    setActiveFileId,
    setFileContent
  });

  useRoomSocket({
    roomId,
    setMembers
  });

//useffect for connection
useEffect(() => {
  socket.connect();

  const handleConnect = () => {
    socket.emit("join-room", {
      roomId,
      fileId: activeFileId,
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
  if (!roomId || !activeFileId) return;

  socket.emit("join-room", {
    roomId,
    fileId: activeFileId,
  });
}, [activeFileId]);


//file initializing
useEffect(() => {

  const handleFileInit = ({ fileId, code }) => {
    setActiveFileId(fileId);
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
        activeFileId,
        setActiveFileId,
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
export default RoomProvider;
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
