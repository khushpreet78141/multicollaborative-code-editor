import React, { useState } from 'react'
import ResizeHandle from '../utils/ResizeHandle'
import { useRoom } from '../context/RoomContext'
import FileDropDown from '../utils/FileDropDown';
import { ChevronDown, ChevronRight, FileCodeCorner, FolderCode } from 'lucide-react';

const LiveFileTab = () => {
  const [width, setWidth] = useState(400);
  const { dir, hierarchy, selectAndEditFolder } = useRoom();

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
    <div className='h-screen   bg-white/5 border border-white/10 flex justify-between'
      style={{ width: width, }}
    >
      <div className='h-full w-full p-5'>
        <div className='flex w-full justify-between '>
          <p>File Structure: {dir?.name}</p>

          {/* <button onClick={() => selectAndEditFolder()}>selectAndEditFolder</button> */}

        </div>
        <hr className='border-white/10 mt-3 mb-3' />
        {hierarchy.name !== "none" && <ObjectRenderor obj={hierarchy} />}
        {hierarchy.name == "none" && (<>
          <center> <button
            onClick={() => selectAndEditFolder()}
            className='bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-all duration-200'>
            Open Folder
          </button>
          </center>
        </>)}


      </div>
      <ResizeHandle setSidebarWidth={setWidth} />

    </div>
  )
}

export default LiveFileTab
