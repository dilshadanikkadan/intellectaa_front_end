"use client";
import React, { useContext, useEffect, useState } from "react";
import ChatSideBar from "../utilComponents/ChatSideBar";
import MesageBar from "./MesageBar";
import { SocketContext } from "@/store/storeProviders/SocketProvider";
import { useRouter } from "next/navigation";
import { useStdudentStore } from "@/store/storeProviders/UseCallStore";
import { flushSync } from "react-dom";

const ChatSector = () => {
  const [cuurrentChat, setCurrentChat] = useState(null);
  const [currentChatMembers, setCurrentChatMembers] = useState<any>([]);
  const [currentChatMembersName, setCurrentChatMemberNames] = useState<any>([]);
  const [cuurentRoom, setCurrentRoom] = useState<any>();
  const { socket } = useContext(SocketContext);
  const router = useRouter();
  const setStudnetId = useStdudentStore((state) => state.setStudentId);
  const setCallerSignal = useStdudentStore((state) => state.setCallerSignal);
  const setIncomingCall = useStdudentStore((state) => state.setIncomingCall);
  useEffect(() => {
    console.log("hellooooooooooooooooooooooooooooooooo");

    socket?.on("offer", (data) => {
      setStudnetId(data.fromCall);
      console.log("<<<<<<<<<<<<<<<<<<<^^^^&&&&&&&&&&, got call",data.signal);

      flushSync(() => {
        setCallerSignal(data.signal);
      });
      setIncomingCall(true)
      router.push(`/courses/668e1404a2beef24966912ba/chat/videoCall`);
    });
  }, [socket]);

  return (
    <div className="w-[85%] mx-auto mt-2 md:flex">
      <ChatSideBar
        setCurrentChat={setCurrentChat}
        cuurrentChat={cuurrentChat}
        setCurrentChatMembers={setCurrentChatMembers}
        setCurrentChatMemberNames={setCurrentChatMemberNames}
        setCurrentRoom={setCurrentRoom}
      />
      <MesageBar
        cuurentRoom={cuurentRoom}
        currentChatMembersName={currentChatMembersName}
        cuurrentChatId={cuurrentChat}
        currentChatMembers={currentChatMembers}
      />
    </div>
  );
};

export default ChatSector;
