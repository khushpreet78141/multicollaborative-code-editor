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
  const [cursors, setCursors] = useState([])
  
  const [currentUserId, setcurrentUserId] = useState(null)
  const [dir, setDir] = useState(null)
  const [file_loading, setFileLoading] = useState(false)
  const [hierarchy, setHierarchy] = useState(
    {
      name: "none",
      type: 'file',
      path: '/',
      object: null,
      child: {


      }
    }
  );

  async function selectAndEditFolder() {
    try {
      setFileLoading(true)
      const dirHandle = await window.showDirectoryPicker();
      console.log(`--- Reading hierarchy for: ${dirHandle.name} ---`);
      setDir(dirHandle);
      const folderHierarchy = {
        name: dirHandle.name,
        type: dirHandle.kind,
        object: dirHandle,
        path: '',
        child: await readDirectory(dirHandle, "")
      };
      setHierarchy(folderHierarchy);
      console.log("Hierarchy built:", folderHierarchy);
      //  await readDirectory(dirHandle, "");
    } catch (err) {
      console.error('Error accessing files:', err);
    } finally {
      setFileLoading(false)
    }
  }

  async function readDirectory(directoryHandle, currentPath) {
    const children = [];
    for await (const entry of directoryHandle.values()) {


      const fullPath = currentPath ? `${currentPath}/${entry.name}` : entry.name;

      if (entry.kind === 'file') {

        console.log(` File: ${fullPath}`);
        // return {
        //   name: entry.name,
        //   type: entry.kind,
        //   path: fullPath,
        //   object: entry,
        //   child: {}
        // }
        children.push({
          name: entry.name,
          type: entry.kind,
          path: fullPath,
          object: entry,
          child: {}
        })


        // const file = await entry.getFile();
        // const writable = await entry.createWritable();
        // await writable.write('New content');
        // await writable.close();


      } else if (entry.kind === 'directory') {
        console.log(` Folder: ${fullPath}`);
        
        children.push({
          name: entry.name,
          type: entry.kind,
          path: fullPath,
          object: entry,
          child: await readDirectory(entry, fullPath)
        })
      }
    }
    return children;
  }
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
      console.log("file created :",file);
      setActiveFileId(file._id);
    }

    //get all files belongs to that room
    const handleGetFiles = (files) =>{
      setFiles(files);
      console.log("all files",files);
    }

    const handleUserLeft =(userId)=>{
      showInfo(`${userId} left the room `)
    }
    socket.on("file-init", handleFileInit);
    socket.on("receive-message", handleMessage);
    socket.on("receive-all-messages", handleGetMessage);
    socket.on("file-created",handleCreatedFile);
    socket.on("files-list",handleGetFiles);
    socket.on("user-left",handleUserLeft)
    return () => {
      socket.off("file-init", handleFileInit);
      socket.off("receive-message", handleMessage);
      socket.off("receive-all-messages", handleGetMessage);
      socket.off("file-created",handleCreatedFile);
      socket.off("files-list",handleGetFiles);
      socket.off("user-left",handleUserLeft);
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
        fileContent,
        setFileContent,
        currentUserId,
        setcurrentUserId,
        cursors,
        currentUserId, selectAndEditFolder, hierarchy,
        dir, file_loading,
        roomId
        
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


