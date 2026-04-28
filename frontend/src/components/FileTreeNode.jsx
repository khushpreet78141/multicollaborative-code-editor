import React from "react";
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

  // folder select
  const handleFolderClick = (folder) => {
    if(selectedFolder === folder){
      setSelectedFolder(null);
    }else{
       setSelectedFolder(folder);
    }
   
  };

  const handleActiveFile = (fileId)=>{
    if(activeFileId===fileId){
      setActiveFileId(null)
    }
    else{
      setActiveFileId(fileId)
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

    const handleDelete = (fileId)=>{
      socket.emit("delete-file",{roomId,fileId});

    }
    const handleRename = (fileId)=>{
      
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

            <span>{item.fileName}</span>

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
          </div>

          {/* Render children when expanded */}
          {expandedFolders[item.filePath] && (
            <div className="ml-6 mt-2">
            
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
        <div className={`text-white flex items-center justify-between gap-2 ml-2 p-1 ${item._id===activeFileId && "bg-white/10 rounded-lg"}`} onClick={()=>handleActiveFile(item._id)}>
          <span className="flex items-center gap-2"> <File size={18} /> {item.fileName}</span>
          <div className={`${activeFileId === item._id ? "flex gap-2 items-center" :"hidden"}`}>
          <button onClick={()=>handleDelete(item._id)} className="cursor-pointer"><Trash size={15}/></button>
          <button onClick={()=>handleRename(item._id)} className="cursor-pointer"><FilePen size={15}/></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileTreeNode;
