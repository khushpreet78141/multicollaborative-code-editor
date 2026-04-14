import React, { useState } from 'react'
import ResizeHandle from '../utils/ResizeHandle'
import { useRoom } from '../context/RoomContext'
import FileDropDown from '../utils/FileDropDown';
import socket from "../utils/socket";
import { ChevronDown, ChevronRight, FileCodeCorner, FolderCode,FilePlus,Save } from 'lucide-react';


const LiveFileTab = () => {
  const [width, setWidth] = useState(279);
  const { dir, hierarchy, selectAndEditFolder, file_loading,roomId,files} = useRoom();
  const [fileName, setFileName] = useState("")
  const [type, setType] = useState("file");
  const [parent, setparent] = useState(null);
  const [createFileOpen, setCreateFileOpen] = useState(false)

const handleCreateFile = ()=>{
    socket.emit("create-file",{roomId,name:fileName,type,parent})
    
    setFileName("");
    setType("file");
    setCreateFileOpen(true);
  }

  const ObjectRenderor = (obj) => {
    const [openFOLDER, setOpenFOLDER] = useState(false);

    return (
      <>
        {obj.obj.type === "directory" ? (
          <div>
            <div className='mt-2'>
              {/* <p >{obj.obj.name}</p> */}
              <span className='flex justify-start items-center gap-2' onClick={() => setOpenFOLDER(!openFOLDER)}>
                {openFOLDER ? <ChevronDown /> : <ChevronRight />}
                <FolderCode /> {obj.obj.name}</span>

              {openFOLDER && (
                <div className="pl-1 ml-3 border-l border-white/40">
                  {obj.obj.child.map((child) => {
                    return <ObjectRenderor key={child.id} obj={child} />
                  })}
                </div>
              )}
            </div>

            {/* <p>{obj.obj.name}</p>
            {obj.obj.child.map((child) => {
              return <ObjectRenderor key={child.id} obj={child} />
            })} */}

          </div>
        ) : (
          <div className='mt-2'>
            <span className='flex justify-start items-center gap-2 pl-8'> <FileCodeCorner /> {obj.obj.name}</span>
          </div>
        )}
      </>
    );
  }
  return (
    <div className='h-full  bg-[#0f172a] border  border-white/10 flex justify-between  min-h-0  flex-col  rounded-2xl shadow-l '
      style={{ width: width }}
    >
      <div className='h-full w-full '>
         <button onClick={()=>setCreateFileOpen((prev)=>!prev)} className='text-white'><FilePlus /></button>
         {createFileOpen && <><div className=''>
          <input type="text" className='text-white' placeholder='file-name' value={fileName} onChange={(e)=>setFileName(e.target.value)}/>
          <select name="type" className='text-white' value={type} onChange={(e)=>setType(e.target.value)}>
            <option value="file" className='text-white'>file</option>
            <option value="folder" className='text-white'>folder</option>
            </select>
            <button onClick={handleCreateFile} className='text-white'><Save /></button>
            </div></>}
        <div className='flex w-full justify-between'>  
          <p className='text-white'>File Structure: {dir?.name}</p>

          {/*<button onClick={() => selectAndEditFolder()}>selectAndEditFolder</button>*/}

        </div>
        <hr className='border-white/10 mt-3 mb-3' />
        {hierarchy.name !== "none" && <ObjectRenderor obj={hierarchy} />}
        {hierarchy.name == "none" && (<>
          {file_loading && <center>Loading File...</center>}
          {!file_loading && <center> <button
            onClick={() => selectAndEditFolder()}
            className='bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-all duration-200'>
            Open Folder
          </button>
          </center>}
        </>)}
      </div>

      {/* all files handler */}
      <div>
        {files.map((item,index)=>{
        return(
          <div className='text-white'>
            {item.fileName}
          </div>
        )
       })}
      </div>
      <ResizeHandle setSidebarWidth={setWidth} />
    </div>
  )
}

export default LiveFileTab;
