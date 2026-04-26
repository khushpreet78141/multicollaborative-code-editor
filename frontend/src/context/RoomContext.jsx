import { createContext, useContext, useState } from "react";
import socket from "../utils/socket";
import { useParams } from "react-router-dom";
import { showError, showInfo } from "../utils/Toast";
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

  const [cursors, setCursors] = useState([])
  
  const [currentUserId, setcurrentUserId] = useState(null)
  
  const [cursorHandler, setCursorHandler] = useState(null);
  const [folderFiles,setFolderFiles] = useState([]);
  //const cursorDataRef = useRef({});

  
  useEffect(() => {
    
    const token = localStorage.getItem("token");

    if(!token) return;
     socket.auth = { token }; // update auth dynamically
  socket.connect();
  try{
    const decoded = jwtDecode(token);
    
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
    
  });

  useRoomSocket({
    roomId,
    setMembers,
    setCursors
  });



  //useffect for connection
  useEffect(() => {
    //socket.connect();

    const handleConnect = () => {
      socket.emit("join-room", {
        roomId,
        fileId: activeFileId,
      });
      socket.emit("get-messages", {
        roomId
      })
      socket.emit("get-files",{
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


//For listening events

  useEffect(() => {
    //file initializing
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
      //setothersMessage(messages)
      setMessages(messages)

    }

    //file creation
    const handleCreatedFile = (file)=>{
      
      setActiveFileId(file._id);
      showInfo("File Created Successfully")
    }

    //get all files belongs to that room
    const handleGetFiles = (files) =>{
      setFiles(files);
      console.log("all files",files);    
    }

  //cursor details for all users in particular file
  const handleCursorUpdates = (data)=>{
  
  console.log("cursor update received:", data);
  console.log("cursorHandler exists?", !!cursorHandler);
  if (cursorHandler) {
    console.log("cursor handler exists");
    cursorHandler(data);
  } else {
    console.log("cursor handler missing");
  }
  }

  const handleLoadFolderFiles = (files)=>{
    setFolderFiles(files)
  }


    const handleError =(msg)=>{
      showError(`${msg}`)
    }
    socket.on("file-init", handleFileInit);
    socket.on("receive-message", handleMessage);
    socket.on("receive-all-messages", handleGetMessage);
    socket.on("file-created",handleCreatedFile);
    socket.on("files-list",handleGetFiles);
    socket.on("cursor-update",handleCursorUpdates);
    socket.on("load-folder-files",handleLoadFolderFiles);
    socket.on("error",handleError);

    
    return () => {
      socket.off("file-init", handleFileInit);
      socket.off("receive-message", handleMessage);
      socket.off("receive-all-messages", handleGetMessage);
      socket.off("file-created",handleCreatedFile);
      socket.off("files-list",handleGetFiles);
      socket.off("cursor-update",handleCursorUpdates);
      socket.off("load-folder-files",handleLoadFolderFiles);
      socket.off("error",handleError);
    };

  }, []);

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
        setcurrentUserId,
        cursors,
        currentUserId, 
        roomId,
        setCursorHandler,
        socket,
        setFolderFiles,
        folderFiles
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


