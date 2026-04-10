import { useEffect } from "react"
import socket from '../utils/socket.js'
const useFileSocket = ({roomId,setFiles , setActiveFileId , setFileContent})=>{
    useEffect(() => {
      if(!roomId) return
      socket.on("file-created",(file)=>{
        setFiles(prev=>[...prev,file]);
      });

      socket.on("file-deleted",({fileId})=>{
        setFiles(prev=>prev.filter(item=>item._id!==fileId))
      });

      socket.on("file-renamed",({fileId,fileName})=>{
        setFiles(prev=>prev.map(item=> item._id===fileId?{...item,fileName}:item))
      });

      socket.on("load-file",({fileId,content})=>{
        setActiveFileId(fileId);
        setFileContent(content)
      })


      return () => {
        socket.off("files-list");
      socket.off("file-created");
      socket.off("file-deleted");
      socket.off("file-renamed");
      socket.off("load-file");
      }
    }, [roomId])
    
}

export default useFileSocket;
