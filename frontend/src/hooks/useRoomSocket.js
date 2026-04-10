import { useEffect } from "react";
import socket from "../utils/socket";

const useRoomSocket = ({ roomId, setMembers }) => {

  useEffect(() => {
    if (!roomId) return;

    socket.on("room-users", (users) => {
      setMembers(users);
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