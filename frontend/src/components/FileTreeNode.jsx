import React from "react";
import {
  Folder,
  File,
  ChevronDown,
  FilePlusCorner,
} from "lucide-react";

const FileTreeNode = ({
  item,
  roomId,
  selectedFolder,
  setSelectedFolder,
  openFolderPath,
  setOpenFolderPath,
  folderFiles,
  socket,
  setCreateFileOpen,
}) => {
  // folder select
  const handleFolderClick = (folder) => {
    setSelectedFolder(folder);
  };

  // dropdown open/close + fetch children
  const handleDropDownFiles = (folderPath) => {
    console.log("folder path",folderPath);
    console.log("openFolderPath",openFolderPath);

    if (openFolderPath === folderPath) {
      setOpenFolderPath(null);
    } else {
      setOpenFolderPath(folderPath);
      console.log("openFolderPath2",openFolderPath);
      socket.emit("getting-folder-files", {
        roomId,
        folderPath,
      });
    }
  };

  
  return (
    <div className="ml-2">
      {/* Folder UI */}
      {item.type === "folder" && (
        <div
          className={`text-white ${
            selectedFolder?._id === item._id ? "bg-gray-400" : ""
          }`}
          onClick={() => handleFolderClick(item)}
        >
          <div className="flex items-center gap-2 text-xl">
            <Folder size={22} />

            <span>{item.fileName}</span>

            {/* dropdown */}
            <span
              className="ml-4 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleDropDownFiles(item.filePath);
              }}
            >
              <ChevronDown size={18} />
            </span>

            {/* create file inside this folder */}
            <span
              className="ml-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFolder(item);
                setCreateFileOpen(true);
              }}
            >
              <FilePlusCorner size={18} />
            </span>
          </div>

          {/* Render children when expanded */}
          {openFolderPath === item.filePath && (
            <div className="ml-6 mt-2">
              {folderFiles?.map((child) => (
                <FileTreeNode
                  key={child._id}
                  item={child}
                  roomId={roomId}
                  selectedFolder={selectedFolder}
                  setSelectedFolder={setSelectedFolder}
                  openFolderPath={openFolderPath}
                  setOpenFolderPath={setOpenFolderPath}
                  folderFiles={folderFiles}
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
        <div className="text-white flex items-center gap-2 ml-2">
          <File size={18} />
          <span>{item.fileName}</span>
        </div>
      )}
    </div>
  );
};

export default FileTreeNode;
