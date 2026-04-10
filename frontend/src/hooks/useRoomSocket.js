import { useEffect } from "react";
import socket from "../utils/socket";

const useRoomSocket = ({ roomId, setMembers, setCursors }) => {
  const getRandomColor = () => {
    const colors = [
      "#FFB6C1",
      "#FFDAB9",
      "#FFFFE0",
      "#98FB98",
      "#E0FFFF",
      "#87CEFA",
      "#E6E6FA",
      "#D8BFD8",
      "#FFE4E1",
      "#FFFACD"
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  }
  useEffect(() => {
    if (!roomId) return;

    socket.on("room-users", (users) => {
      setMembers(users);
      setCursors(users.map((user) => ({
        userId: user.userId,
        userName: user.username,
        row: 0,
        col: 0,
        color: getRandomColor(),
      }
      )))
    });

    socket.on("user-joined", (user) => {
      console.log("User joined:", user);
    });

    socket.on("user-left", (user) => {
      console.log("User left:", user);
    });

    return () => {
      socket.off("room-users");
      socket.off("user-joined");
      socket.off("user-left");
    };

  }, [roomId]);
};

export default useRoomSocket;