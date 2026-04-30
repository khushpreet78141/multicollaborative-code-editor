import { createContext, useContext, useState } from "react";
import socket from "../utils/socket";
import { useParams } from "react-router-dom";
import { showError, showInfo } from "../utils/Toast";
import { useEffect,useRef } from "react";

import useRoomSocket from '../hooks/useRoomSocket.js'
import { jwtDecode } from "jwt-decode";
const RoomContext = createContext();


const RoomProvider = ({ children }) => {
  const { roomId } = useParams()
  const [members, setMembers] = useState([]);
  const [files, setFiles] = useState([]);
  const [messages, setMessages] = useState([]);
  const isRemoteChangeRef = useRef(false);
  const [activeFileId, setActiveFileId] = useState(null);

  const [cursors, setCursors] = useState([])

  const [currentUserId, setcurrentUserId] = useState(null)

  const [cursorHandler, setCursorHandler] = useState(null);

  const [folderChildren, setFolderChildren] = useState({});
  const [selectedFolder, setSelectedFolder] = useState(null);
   const [expandedFolders, setExpandedFolders] = useState({});

  const [fileContent, setFileContent] = useState("");

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) return;
    socket.auth = { token }; // update auth dynamically
    socket.connect();
    try {
      const decoded = jwtDecode(token);

      setcurrentUserId(decoded.userId);

    } catch (err) {
      console.error("Token error:", err)
    }

    return () => {
      socket.disconnect();
    }
  }, []);


  useRoomSocket({
    roomId,
    setMembers,
    setCursors
  });



  //useffect for connection
  useEffect(() => {
    

    const handleConnect = () => {
      socket.emit("join-room", {
        roomId,
        fileId: activeFileId,
      });
      socket.emit("get-messages", {
        roomId
      })
      socket.emit("get-files", {
        roomId
      })
    };

    socket.on("connect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);
      
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


  //For listening events

  useEffect(() => {
    //file initializing
    const handleFileInit = ({ fileId, code }) => {
      setActiveFileId(fileId);
      setFileContent(code)
    };

    const handleMessage = (message) => {
      
      setMessages((prev) => [...prev, message]);
    }

    const handleGetMessage = (messages) => {

      setMessages(messages);

    }


    //file creation
    const handleCreatedFile = (file) => {
      socket.emit("get-files", {
      roomId
      });

      if (selectedFolder) {
        socket.emit("getting-folder-files", {
          roomId,
          folderPath: selectedFolder.filePath
        });
      }
      
      setActiveFileId(file._id);
      setSelectedFolder(null);
      showInfo("File Created Successfully");    
    }

    //get all files belongs to that room
    const handleGetFiles = (files) => {
      setFiles(files);

    }

    //cursor details for all users in particular file
    const handleCursorUpdates = (data) => {

      console.log("cursor update received:", data);
      console.log("cursorHandler exists?", !!cursorHandler);
      //isRemoteChangeRef.current = true
      if (cursorHandler) {
        console.log("cursor handler exists");
        cursorHandler(data);
      }else {
        console.log("cursor handler missing");
      }
    }

    const handleLoadFolderFiles = ({ folderPath, files }) => {
      setFolderChildren((prev) => ({ ...prev, [folderPath]: files }));

    }

    const handleLoadFile = ({activeFileId,content})=>{

      isRemoteChangeRef.current = true;
       setFileContent(content || ""); 
      console.log("file id",activeFileId);
      console.log("content",content);
    }

    const handleDeletedFile = (fileId)=>{
        // 1. Remove from root files instantly
  setFiles((prev) => prev.filter((file) => file._id !== fileId));
          // remove file from all folderChildren
  setFolderChildren((prev) => {
    const updated = {};

    for (const path in prev) {
      updated[path] = prev[path].filter(
        (file) => file._id !== fileId
      );
    }
    socket.emit("get-files",{roomId});
    return updated;
    });

        if (activeFileId === fileId) {
        setActiveFileId(null);
        setFileContent("");
     }
    }

    const handleError = (msg) => {
      showError(`${msg}`);
    }

    socket.on("file-init", handleFileInit);
    socket.on("receive-message", handleMessage);
    socket.on("receive-all-messages", handleGetMessage);
    socket.on("file-created", handleCreatedFile);
    socket.on("files-list", handleGetFiles);
    socket.on("cursor-update", handleCursorUpdates);
    socket.on("load-folder-files", handleLoadFolderFiles);
    socket.on("load-file",handleLoadFile);
    socket.on("file-deleted",handleDeletedFile);
    socket.on("error", handleError);
  

    return () => {
      socket.off("file-init", handleFileInit);
      socket.off("receive-message", handleMessage);
      socket.off("receive-all-messages", handleGetMessage);
      socket.off("file-created", handleCreatedFile);
      socket.off("files-list", handleGetFiles);
      socket.off("cursor-update", handleCursorUpdates);
      socket.off("load-folder-files", handleLoadFolderFiles);
      socket.off("load-file",handleLoadFile);
      socket.off("file-deleted",handleDeletedFile);
      socket.off("error", handleError);
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
        setFileContent,
        fileContent,
        setcurrentUserId,
        cursors,
        currentUserId,
        roomId,
        setCursorHandler,
        socket,
        folderChildren,
        setFolderChildren,
        selectedFolder,
        setSelectedFolder,
        expandedFolders,
        setExpandedFolders,
        isRemoteChangeRef
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










