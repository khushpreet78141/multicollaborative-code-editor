import activeFiles from "../source/stores/activeFileStore.js";
import FileContent from "../source/models/fileContentSchema.js";
import File from "../source/models/fileSchema.js";

export default function fileSockets({io, socket}) {
  socket.on("get-files", async ({ roomId }) => {

    if (!roomId) return;
    // security check: ensure user is in room
    if (!socket.rooms.has(roomId)) return;

    const files = await File.find({ roomId });

    socket.emit("files-list", files);
  });


   socket.on("open-file", async ({roomId, fileId }) => {
      if (!roomId || !fileId) return;

    if (!socket.rooms.has(roomId)) return;
  
       // fetch or load content
    if(!activeFiles.has(fileId)){
        const fileDoc = await FileContent.findOne({fileId});
        const content = fileDoc ? fileDoc.content :""
        activeFiles.set(fileId,{
            roomId,
            content,
            lastEditedBy:null,
            changed:false

        })
        
    }

    //send current content
    const fileState = activeFiles.get(fileId)
      // send content back to client
      socket.emit("load-file",{fileId,content:fileState.content});
   });


//   manual save event
socket.on("save-file",async({roomId,fileId})=>{
      if (!roomId || !fileId) return;

    if (!socket.rooms.has(roomId)) return;
    const fileState = activeFiles.get(fileId);
    if(!fileState) return;

    await FileContent.updateOne(
        {fileId},

        {content:fileState.content,
        lastEditedBy:fileState.lastEditedBy},
        {upsert:true}
    )
    fileState.changed = false;
})


  // CREATE FILE
  socket.on("create-file", async ({ roomId, name }) => {

    if (!roomId || !name) return;
    if (!socket.rooms.has(roomId)) return;

    const file = await File.create({
      roomId,
      name
    });

    await FileContent.create({
      fileId: file._id,
      content: ""
    });

    io.to(roomId).emit("file-created", file);
  });


   // RENAME FILE
  socket.on("rename-file", async ({ roomId, fileId, name }) => {

    if (!roomId || !fileId || !name) return;
    if (!socket.rooms.has(roomId)) return;

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

    await File.deleteOne({ _id: fileId });

    await FileContent.deleteOne({ fileId });

    // remove from memory cache
    activeFiles.delete(fileId);

    io.to(roomId).emit("file-deleted", { fileId });
  });

}


  

  
