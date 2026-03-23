import { io } from "socket.io-client";

console.log("File started");  // VERY IMPORTANT

const socket = io("http://localhost:3000");

console.log("Trying to connect...");

socket.on("connect", () => {
    console.log("Connected:", socket.id);
});

socket.on("connect_error", (err) => {
    console.log("Connection error:", err.message);
});

