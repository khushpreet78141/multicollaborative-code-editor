import activeFiles from "../source/stores/activeFileStore.js";
import FileContent from "../source/models/fileContentSchema.js";
import File from "../source/models/fileSchema.js";
import RoomMember from '../source/models/roomMemberSchema.js';
import redisClient from "../source/utils/redisClient.js";
import fs from "fs";
import path from "path";
import { type } from "os";

export default function fileSockets({ io, socket, roomUsers }) {

  //getting all files that are in main folder
  socket.on("get-files", async ({ roomId }) => {
    if (!roomId) return;

    if (!socket.rooms.has(roomId)) return;

    let files = await File.find({ roomId,filePath:{
      $regex:`^storage/${roomId}/[^/]+$`
    } });


    if (files.length === 0) {
        const roomFolder = path.join("storage", roomId);

        if (!fs.existsSync(roomFolder)) {
            fs.mkdirSync(roomFolder, { recursive: true });
        }
        const defaultFilePath = path.join(roomFolder, "main.js");
        if (!fs.existsSync(defaultFilePath)) {
            fs.writeFileSync(
                defaultFilePath,
                "// start coding..."
            );
        }
        const defaultFile = await File.create({
            fileName: "main.js",
            roomId,
            type: "file",
            filePath: defaultFilePath,
            createdBy: socket.user?.id
        });

        files = [defaultFile];
        io.to(roomId).emit("file-created", defaultFile);
    }
    socket.emit("files-list", files);
});


  //socket for opening file
  socket.on("open-file", async ({ roomId, fileId }) => {
    if (!roomId || !fileId) return;

    if (!socket.rooms.has(roomId)) return;

    const fileDoc = await File.findById(fileId);

    if (!fileDoc) {
        return socket.emit("error", "File not found");
    }

    if (fileDoc.type === "folder") return;

    const redisKey = `file:${fileId}`;

    let content = await redisClient.get(redisKey);

    if (content === null) {
        if (fs.existsSync(fileDoc.filePath)) {
            content = fs.readFileSync(fileDoc.filePath, "utf8");
        }else {
            content = "";
        }

        await redisClient.set(redisKey, content);
        console.log("Loaded from disk → stored in Redis");
    } else {
        console.log("Loaded from Redis");
    }

    socket.emit("load-file", {
        fileId,
        content
    });
});


  //   manual save event
  socket.on("save-file", async ({ roomId, fileId }) => {
    if (!roomId || !fileId) return;

    if (!socket.rooms.has(roomId)) return;
    //const fileState = activeFiles.get(fileId);
    const redisKey = `file:${fileId}`
    const fileState = await redisClient.get(redisKey)
    if (!fileState){
      return socket.emit("error","no file content found !")
    };

  
    const file = await File.findById(fileId);
    if(!file){
      return socket.emit("error","file not found")
    } 

    if(file.type !== "file") return;
    fs.writeFileSync(file.filePath,fileState);
    file.lastModified = new Date()
    await file.save();
    socket.emit("file-saved", {
        fileId,
        message: "File saved successfully"
    });
  })


  // CREATE FILE
  socket.on("create-file", async ({ roomId, name, type, relativePath }) => {

    if (!roomId || !name) return;
    if (!socket.rooms.has(roomId)) return;
    const role = socket.data.roles[roomId]

    if (role !== "owner" && role !== "editor") {
      return socket.emit("error", "Permission denied for creation of File !");
    }

    const roomFolder = path.join("storage", roomId);
    const safeRelativePath = relativePath || "";

  const fullPath = path.join(
    roomFolder,
    safeRelativePath,
    name
  );


    //if (!fs.existsSync(fullPath)) {
    //  fs.mkdirSync(fullPath, { recursive: true });
    //}

    //const fullPath = path.join(targetFolder, name);

    if (type === "folder") {
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
    } else {
      const parentDir = path.dirname(fullPath);
      if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
      if (!fs.existsSync(fullPath)) {
        fs.writeFileSync(fullPath, "// start coding...");
      }}
      
      const normalizedPath = fullPath.replace(/\\/g, "/");

      const file = await File.create({
        roomId,
        fileName: name,
        type: type || "file",
        filePath: normalizedPath,
        createdBy: socket.user.id
      });

    
      io.to(roomId).emit("file-created", file);
    });


  // RENAME FILE
  socket.on("rename-file", async ({ roomId, fileId, name }) => {

    if (!roomId || !fileId || !name) return;
    if (!socket.rooms.has(roomId)) return;

    if (role !== "owner" && role !== "editor") {
      return socket.emit("error", "Permission denied for Rename of File !");
    }
    const file = await File.findByIdAndUpdate(
      fileId,
      { name },
      { new: true }
    );

    if (!file) return;

    io.to(roomId).emit("file-renamed", {
      fileId,
      name
    });
  });


  // DELETE FILE
  socket.on("delete-file", async ({ roomId, fileId }) => {
    if (!roomId || !fileId) return;
    if (!socket.rooms.has(roomId)) return;
    const role = socket.data.roles[roomId]
    if (role !== "owner" && role !== "editor") {
      return socket.emit("error", "Permission denied for Deletion of File !");
    }

   
      const file = await File.findByIdAndDelete(fileId);
      if(!file){
        return socket.emit("error","File Not found!");
      }

      //deletion from disk
      if(fs.existsSync(file.filePath)){
          if (file.type === "folder") {
        fs.rmSync(file.filePath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(file.filePath);
      }
      }
      

      //remove from memory cache
     
      const redisKey = `file:${fileId}`
      await redisClient.del(redisKey);


    io.to(roomId).emit("file-deleted", { fileId });
  });

  //getting files of folder 
  socket.on("getting-folder-files",async({roomId,folderPath})=>{
    if(!roomId || !folderPath) return;
    if(!socket.rooms.has(roomId)) return;
    const files = await File.find({roomId,filePath:{
      $regex:`^${folderPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`
    }});
    socket.emit("load-folder-files",files);
})


}







