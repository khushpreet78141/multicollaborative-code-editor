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
  const activeFileIdRef = useRef(null);

  const [cursors, setCursors] = useState([]);

  const [currentUserId, setcurrentUserId] = useState(null);

  const cursorHandlerRef = useRef(null);

  const [folderChildren, setFolderChildren] = useState({});
  const [selectedFolder, setSelectedFolder] = useState(null);
   const [expandedFolders, setExpandedFolders] = useState({});

  const [fileContent, setFileContent] = useState("");
  const selectedFolderRef = useRef(null);

useEffect(() => {
  selectedFolderRef.current = selectedFolder;
}, [selectedFolder]);

useEffect(() => {
  activeFileIdRef.current = activeFileId
}, [activeFileId])


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
      });
      
      socket.emit("get-files", {
        roomId
      });

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
      const currentFolder = selectedFolderRef.current;

       if (currentFolder) {
    const folderPath = currentFolder.filePath;

    setFolderChildren((prev) => ({
      ...prev,
      [folderPath]: [...(prev[folderPath] || []), file],
    }));
  } else {
    setFiles((prev) => [...prev, file]);
  }
    
      if(file.type == 'folder'){
        setSelectedFolder(file);
        setActiveFileId(null);
      }
      if(file.type == 'file'){
        setActiveFileId(file._id);
        setSelectedFolder(null); 
      }

      showInfo(`File: ${file.fileName} Created Successfully`);    
    }

  const handleGetFiles = (files) => {
    setFiles(files);
};

    //cursor details for all users in particular file

    const handleCursorUpdates = (data) => {

     
     
  if (cursorHandlerRef.current.handleCursor) {
    cursorHandlerRef.current.handleCursor(data);
  } else {
    console.log("cursor handler missing");
  }
    }

    const handleLoadFolderFiles = ({ folderPath, files }) => {
      setFolderChildren((prev) => ({ ...prev, [folderPath]: files }));

    }

    const handleLoadFile = ({activeFileId,content})=>{

      isRemoteChangeRef.current = true; 
      setFileContent(content || ""); 
     
    }

  const handleDeletedFile = ({fileId,relativePath})=>{
    // 1. Remove from root files instantly
   
   // ✅ remove from root
  setFiles((prev) =>
    prev.filter((file) => file._id !== fileId)
  );
  
  // ✅ remove ONLY from the correct folder
  setFolderChildren((prev) => {
    // if folder not loaded → do nothing
    if (!prev[relativePath]) return prev;

    return {
      ...prev,
      [relativePath]: prev[relativePath].filter(
        (file) => file._id !== fileId
      ),
    };
  });

  // ✅ active file cleanup
  if (activeFileIdRef.current === fileId) {
    setActiveFileId(null);
    setFileContent("");
  }

  showInfo("File deleted successfully");
}

  const handleFileRenamed = ({file,newName,oldName})=>{
    console.log(`now before rename file is ${oldName}`);
    console.log(`file after renamed ${newName}`);
  setFiles((prev)=>prev.map((item)=>item._id === file._id ? {...item,fileName:newName} :item ));
  
  setFolderChildren((prev) => {
    const updated = {};
    for (const path in prev) {
      updated[path] = prev[path].map((item) =>
        item._id === file._id
          ? { ...item, fileName: newName }
          : item
      );
    }
    return updated;
  });
  
    showInfo(`${oldName} file renamed to ${newName}`);
    }

    const handleCodeUpdate = ({fileId,code}) =>{
      if(fileId !== activeFileIdRef.current) return;
      isRemoteChangeRef.current = true;
      setFileContent((prev) => {
    if (prev === code) return prev; 
    return code;
  });
   //  force re-sync cursor
  setTimeout(() => {
    if (cursorHandlerRef.current?.getCursorPosition) {
  const pos = cursorHandlerRef.current.getCursorPosition();

  socket.emit("cursor-move", {
    roomId,
    fileId,
    position: pos
  });
}
  }, 0)    
    }
    const handleUserTyping = ({socketId,userName})=>{
      console.log("handleUserTyping is called ?");
      showInfo(`${userName} is typing......`);
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
    socket.on("file-renamed",handleFileRenamed);
    socket.on("code-update",handleCodeUpdate);
    socket.on("user-typing",handleUserTyping);
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
      socket.off("file-renamed",handleFileRenamed);
      socket.off("code-update",handleCodeUpdate);
      socket.off("user-typing",handleUserTyping);
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
        cursorHandlerRef,
        socket,
        folderChildren,
        setFolderChildren,
        selectedFolder,
        setSelectedFolder,
        expandedFolders,
        setExpandedFolders,
        isRemoteChangeRef,
        activeFileIdRef
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










