import React, { useRef } from "react";
import { useState,useEffect } from "react";
import {
  Folder,
  File,
  ChevronDown,
  ChevronRight,
  FilePlusCorner,
  Trash,
  FilePen
} from "lucide-react";
import { useRoom } from "../context/RoomContext";

const FileTreeNode = ({
  item,
  roomId,
  folderChildren,
  socket,
  setCreateFileOpen,

}) => {

  const {selectedFolder,setSelectedFolder,activeFileId,setActiveFileId,expandedFolders,setExpandedFolders} = useRoom();
  
  const [newName, setNewName] = useState("");
  const [renamingId, setRenamingId] = useState(null);
  const inputRef = useRef(null);


  // folder select
  const handleFolderClick = (folder) => {
    if(selectedFolder === folder){
      setSelectedFolder(null);
    }else{
       setSelectedFolder(folder);
       console.log("selected folder",folder)
    }
   
  };

  useEffect(() => {
  if (renamingId) {
    inputRef.current.focus();
    inputRef.current.select();
  }
  }, [renamingId]);


  const handleActiveFile = (fileId,filePath)=>{
    if(activeFileId===fileId){
      setActiveFileId(null)
    }
    else{
      setActiveFileId(fileId)
      //setSelectedFolder(null)
    }
    
  }

  // dropdown open/close + fetch children
  const handleDropDownFiles = (folderPath) => {
  const isExpanded = expandedFolders[folderPath];

  setExpandedFolders((prev) => ({
    ...prev,
    [folderPath]: !isExpanded
  }));

  if (!isExpanded && !folderChildren[folderPath]) {
    socket.emit("getting-folder-files", {
      roomId,
      folderPath
    });
  }
};
    const handleDelete = (file)=>{
      console.log("file deletion called ",file._id);
      const fileId = file._id;
      socket.emit("delete-file",{roomId,fileId});
    }
    //const isRenaming = renamingId === item._id;

    const handleRenameStart = (fileId,name)=>{
        
        setRenamingId(fileId);
        setNewName(name);
    }

    const handleRenameSubmit = ()=>{
      if (!newName.trim()) return;
      socket.emit("rename-file",{roomId,fileId:renamingId,name:newName.trim()})
      setRenamingId(null)
    }

    const handleRenameCancel = ()=>{
      setRenamingId(null)
    }

    const handleKeyDown = (e)=>{
      if(e.key === "Enter"){
        handleRenameSubmit();
      }else if(e.key === "Escape"){
        handleRenameCancel();
      }
    }



  return (
    <div className="ml-2">
      {/* Folder UI */}
      {item.type === "folder" && (
        <div
          className={`text-white p-1 ${
            selectedFolder?._id === item._id ? "bg-white/10 rounded-lg" : ""
          }`}
          onClick={(e) => {e.stopPropagation();handleFolderClick(item)}}
        >
          
          <div className="flex items-center gap-2 text-[16px] font-bold">
            <span
              className="ml-2 cursor-pointer  border-r "
              onClick={(e) => {
                e.stopPropagation();
                handleDropDownFiles(item.filePath);
              }}
            >
             {expandedFolders[item.filePath] ?<ChevronDown size={19}/> :<ChevronRight size={19}/>}
            </span>
            <Folder size={22} className="ml-1"/>
        {renamingId===item._id ? (<input type="text" ref={inputRef} value={newName} onKeyDown={handleKeyDown} onChange={(e)=>setNewName(e.target.value)} onBlur={handleRenameSubmit}/>) : (<span>{item.fileName}</span>)}
              
            {/* dropdown */}
            
            {/* create file inside this folder */}
            <span
              className="ml-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setCreateFileOpen(true)
                setSelectedFolder(item);
              }}
            >
              <FilePlusCorner size={18} />
            </span>
            {selectedFolder === item && <span className="ml-4 flex  items-center gap-1">
              <FilePen size={15} onClick={()=>handleRenameStart(item._id,item.fileName)}/> <Trash size={15} onClick={(e)=>{e.stopPropagation();handleDelete(item)}} />
            </span>}
            {selectedFolder === item && <span>
             
            </span>}
          </div>

          {/* Render children when expanded */}
          {expandedFolders[item.filePath] && (
            <div className=" mt-1">
            
              {folderChildren[item.filePath]?.map((child) => (
                <FileTreeNode 
                  key={child._id}
                  item={child}
                  roomId={roomId}
                  folderChildren={folderChildren}
                  socket={socket}
                  setCreateFileOpen={setCreateFileOpen}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* File UI */}
      {item.type === "file" && (
        <div className={`text-white flex items-center justify-between gap-2 ml-2 p-1 ${item._id===activeFileId && "bg-white/10 rounded-lg"}`} onClick={(e)=>{e.stopPropagation();handleActiveFile(item._id,item.filePath)}}>
          <span className="flex items-center gap-2"> <File size={18} /> {renamingId === item._id ? (<input type="text" ref={inputRef} value={newName} onKeyDown={handleKeyDown} onChange={(e)=>setNewName(e.target.value)} onBlur={() => {
  if (newName.trim()) handleRenameSubmit();
  else handleRenameCancel();
}}/>) : (<span>{item.fileName}</span>)}</span>
          <div className={`${activeFileId === item._id ? "flex gap-2 items-center" :"hidden"}`}>
          <button onClick={()=>handleDelete(item)} className="cursor-pointer"><Trash size={15} /></button>
          <button onClick={()=>handleRenameStart(item._id,item.fileName)} className="cursor-pointer"><FilePen size={15} /></button>
        </div>
        </div>
      )}
    </div>
  );
};

export default FileTreeNode;
