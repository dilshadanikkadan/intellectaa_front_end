"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useUserStore } from "./UseUserStore";

const BACKEND_URL = "https://www.medifly.site/api/chat";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[];
  rooms: Record<string, string[]>;
}

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  onlineUsers: [],
  rooms:{}
});

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const user = useUserStore((state) => state.user);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [rooms, setRooms] = useState<Record<string, string[]>>({});
  useEffect(() => {
    const newSocket = io(BACKEND_URL, { transports: ["websocket", "polling"] });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => {
      console.log("Connected to server");
      if (user) {
        socket.emit("Newuser_joined", { userId: user._id });
      }
    };

    const handleDisconnect = () => {
      console.log("Disconnected from server");
    };

    const handleOnlineUsers = (data: string[]) => {

      setOnlineUsers(data);
    };

    const handleRooms = (data: Record<string, string[]>) => {
      console.log("room data:", data);
      setRooms(data);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("onlineUsers", handleOnlineUsers);
    socket.on("rooms", handleRooms);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("onlineUsers", handleOnlineUsers);
      socket.off("rooms", handleRooms);
    };
  }, [socket, user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers,rooms }}>
      {children}
    </SocketContext.Provider>
  );
};
