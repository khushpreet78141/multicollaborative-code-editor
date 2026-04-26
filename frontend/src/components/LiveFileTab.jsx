import React, { useState } from 'react'
import ResizeHandle from '../utils/ResizeHandle'
import { useRoom } from '../context/RoomContext'


import { ChevronDown, FilePlus, Save, Folder, File, FilePlusCorner } from 'lucide-react';
import FileTreeNode from './FileTreeNode';


const LiveFileTab = () => {
  const [width, setWidth] = useState(279);
  const { roomId, files } = useRoom();
  const [fileName, setFileName] = useState("")
  const [type, setType] = useState("file");
  const [createFileOpen, setCreateFileOpen] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState(null);
  const { setFolderFiles, folderFiles, socket } = useRoom();
  const [openFolderPath, setOpenFolderPath] = useState(null);

  
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


  return (
    <div className='h-full  bg-[#0f172a] border  border-white/10 flex justify-between  min-h-0  flex-col  rounded-2xl shadow-l '
      style={{ width: width }}
    >
      <div className=' w-full '>
        <button onClick={() => setCreateFileOpen((prev) => !prev)} className='text-white'><FilePlus /></button>
        {createFileOpen && <><div className=''>
          <input type="text" className='text-white' placeholder='file-name' value={fileName} onChange={(e) => setFileName(e.target.value)} />
          <select name="type" className='text-white' value={type} onChange={(e) => setType(e.target.value)}>
            <option value="file" className='text-white'>file</option>
            <option value="folder" className='text-white'>folder</option>
          </select>
          <button onClick={handleCreateFile} className='text-white'><Save /></button>
        </div></>}

        <hr className='border-white/10 mt-3 mb-3' />

      </div>

      {/* all files handler */}
      <div className='p-3'>
        {files.map((item, index) => {
          return (
            <div key={index} className={`text-white ${selectedFolder?._id === item._id && "bg-gray-400"}`}>
             
                <FileTreeNode item={item} roomId={roomId} setOpenFolderPath={setOpenFolderPath} selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder} openFolderPath={openFolderPath} folderFiles={folderFiles} socket={socket} setCreateFileOpen={setCreateFileOpen}/>

            </div>
          )
        })}
      </div>
      <ResizeHandle setSidebarWidth={setWidth} />
    </div>
  )
}

export default LiveFileTab;
