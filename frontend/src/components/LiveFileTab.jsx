import React, { useState } from 'react'
import ResizeHandle from '../utils/ResizeHandle'
import { useRoom } from '../context/RoomContext'
import { useEffect } from 'react';

import { ChevronDown, FilePlus, Save, Folder, File, FilePlusCorner } from 'lucide-react';
import FileTreeNode from './FileTreeNode';


const LiveFileTab = () => {
  const [width, setWidth] = useState(279);
  const { roomId, files } = useRoom();
  const [fileName, setFileName] = useState("")
  const [type, setType] = useState("file");
  const [createFileOpen, setCreateFileOpen] = useState(false)
  const { folderChildren,setFolderChildren,activeFileId,setActiveFileId , socket ,selectedFolder,setSelectedFolder,expandedFolders,setExpandedFolders} = useRoom();

  const relativePath = selectedFolder?.filePath
    ?.replace(`storage/${roomId}/`, "")
    ?.replace(/\\/g, "/") || "";


  const handleCreateFile = () => {
    console.log("handle file created")
    socket.emit("create-file", { roomId, name: fileName, type, relativePath })
  
    setFileName("");
    setType("file");
    setCreateFileOpen(false);
  }

  useEffect(() => {

    console.log("activefileId",activeFileId);
    socket.emit("open-file",{roomId,activeFileId});

  }, [roomId,activeFileId]);
  

  return (
    <div className='h-full  bg-[#0f172a] border  border-white/10 flex justify-between  min-h-0  flex-col  rounded-2xl shadow-l '
      style={{ width: width }}
    >
      <div className=' w-full '>
        <div className='text-xl text-blue-300 flex items-center gap-3 m-3 font-bold'><span>Create your file </span>
        <button onClick={() => setCreateFileOpen((prev) => !prev)} className='text-white cursor-pointer'><FilePlus /></button></div>
        {createFileOpen && <><div className='m-3 '>
          <div className='flex items-center w-full justify-between mt-3'>
          <input type="text" className='text-white w-[150px] ' placeholder='file-name' value={fileName} onChange={(e) => setFileName(e.target.value)} />
          <select name="type" className='text-white' value={type} onChange={(e) => setType(e.target.value)}>
            <option value="file" className='text-white'>file</option>
            <option value="folder" className='text-white'>folder</option>
          </select></div>
          <button onClick={handleCreateFile} className='text-white  bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center mt-3 w-1/2 m-auto justify-around p-1 px-3 rounded-4xl '><span><Save /></span><span className='font-bold'>Save</span></button>
        </div></>}

        <hr className='border-white/10 mt-3 mb-3' />

      </div>

      {/* all files handler */}
      <div className='p-1'>
        {files.map((item, index) => {
          return (
            <div key={index} className={`text-white p-1 ${selectedFolder?._id === item._id && "bg-white/10 rounded-lg"}`}>
             
                <FileTreeNode item={item} roomId={roomId} folderChildren={folderChildren} socket={socket} setCreateFileOpen={setCreateFileOpen} />
                
            </div>
          )
        })}
      </div>
      <ResizeHandle setSidebarWidth={setWidth} />
    </div>
  )
}

export default LiveFileTab;
