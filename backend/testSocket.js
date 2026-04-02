import { io } from "socket.io-client";

console.log("File started");

const socket = io("http://localhost:3000", {
  extraHeaders: {
    Cookie: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWJlNTA4NjUzNWI5YTQ0MTU4NjQyZmYiLCJpYXQiOjE3NzQzNTMxNDIsImV4cCI6MTc3NDQzOTU0Mn0.Af5paC-7oHb8-Hc2BZ4Qhugai50jT35TLgXD4KjyJhk"
  },
  transports: ["websocket"],
  timeout: 5000
});

console.log("Trying to connect...");

socket.on("connect", () => {
  console.log("✅ Connected:", socket.id);

  // 🔥 test event
  socket.emit("pingTest");
  socket.emit("code-change", {
  roomId: "room1",
  fileId: "file1",
  code: "hello"
});
});

socket.on("pongTest", (msg) => {
  console.log("📨 Server replied:", msg);
});

socket.on("connect_error", (err) => {
  console.log("❌ Error:", err.message);
});




