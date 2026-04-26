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
  expandedFolders,
  setExpandedFolders,
  folderChildren,
  socket,
  setCreateFileOpen,
  handleCreateFile
}) => {

  // folder select
  const handleFolderClick = (folder) => {
    setSelectedFolder(folder);
  };

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
                setCreateFileOpen(true)
                setSelectedFolder(item);
                handleCreateFile;
                e.stopPropagation();
              }}

            >
              <FilePlusCorner size={18} />
            </span>
          </div>

          {/* Render children when expanded */}
          {expandedFolders[item.filePath] && (
            <div className="ml-6 mt-2">
              {console.log("here folder children",folderChildren)}
              {folderChildren[item.filePath]?.map((child) => (
                <FileTreeNode 
                  key={child._id}
                  item={child}
                  roomId={roomId}
                  selectedFolder={selectedFolder}
                  setSelectedFolder={setSelectedFolder}
                  setExpandedFolders={setExpandedFolders}
                  expandedFolders={expandedFolders}
                  folderChildren={folderChildren}
                  socket={socket}
                  setCreateFileOpen={setCreateFileOpen}
                  handleCreateFile={handleCreateFile}
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
