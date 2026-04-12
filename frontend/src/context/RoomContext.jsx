import { createContext, useContext, useState } from "react";
import socket from "../utils/socket";
import { useParams } from "react-router-dom";
import { showInfo } from "../utils/Toast";
import { useEffect } from "react";
import useFileSocket from '../hooks/useFileSocket.js'
import useRoomSocket from '../hooks/useRoomSocket.js'
import { jwtDecode } from "jwt-decode";
const RoomContext = createContext();


const RoomProvider = ({ children }) => {
  const { roomId } = useParams()
  const [members, setMembers] = useState([]);
  const [files, setFiles] = useState([]);
  const [messages, setMessages] = useState([]);
  const [code, setCode] = useState("");
  const [activeFileId, setActiveFileId] = useState(null);
  const [fileContent, setFileContent] = useState("")
  //const [othersMessage, setothersMessage] = useState([])
  const [cursors, setCursors] = useState([])
  const [currentUserId, setcurrentUserId] = useState(null)
  

  useEffect(() => {
    
    const token = localStorage.getItem("token");

    if(!token) return;
     socket.auth = { token }; // update auth dynamically
  socket.connect();
  try{
    const decoded = jwtDecode(token);
    console.log("decoded here",decoded.userId)
    setcurrentUserId(decoded.userId);
    
  }catch(err){
    console.error("Token error:",err)
  }
  
    return () => {
      socket.disconnect();
    }
  }, []);


  //attaching socket logic 
  useFileSocket({
    roomId,
    setFiles,
    setActiveFileId,
    setFileContent
  });

  useRoomSocket({
    roomId,
    setMembers,
    setCursors
  });



  //useffect for connection
  useEffect(() => {
    socket.connect();

    const handleConnect = () => {
      socket.emit("join-room", {
        roomId,
        fileId: activeFileId,
      });
      socket.emit("get-messages", {
        roomId
      })
    };

    socket.on("connect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.disconnect();
    };
  }, [roomId, activeFileId]);


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
    const handleMessage = (message) => {  
      console.log("sender msg",message);
      setMessages((prev) => [...prev, message]);
    }
    const handleGetMessage = (messages) => {
      console.log("all messages", messages);
      setMessages(messages);
    }

    // const handleCursorMove = ({ roomId, position, userId }) => {
    //   setCursors((prev) =>
    //     prev.map((cursor) =>
    //       cursor.userId === userId
    //         ? { ...cursor, row: position.x, col: position.y }
    //         : cursor
    //     )
    //   );
    // }

    socket.on("file-init", handleFileInit);
    socket.on("receive-message", handleMessage);
    socket.on("receive-all-messages", handleGetMessage);
    // socket.on("cursor_move", handleCursorMove);

    return () => {
      socket.off("file-init", handleFileInit);
      socket.off("receive-message", handleMessage);
      socket.off("receive-all-messages", handleGetMessage);
      // socket.off("cursor_move", handleCursorMove);
    };

  }, []);

  // useEffect(() => {
  //   socket.emit("cursor_move", {
  //     roomId,

  //     position,
  //     userId: currentUserId,

  //   })
  // }, [position])

  const sendMessage = (msg) => {
    socket.emit("send-message", {
      roomId,
      msg
    })
  }

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
        sendMessage,
        code,
        setCode,
        //setothersMessage,
        //othersMessage,
        currentUserId,
        setcurrentUserId,
        cursors,
        
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
