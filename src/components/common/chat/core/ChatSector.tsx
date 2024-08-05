"use client";
import React, { useContext, useEffect, useState } from "react";
import ChatSideBar from "../utilComponents/ChatSideBar";
import MesageBar from "./MesageBar";
import { SocketContext } from "@/store/storeProviders/SocketProvider";
import { useParams, useRouter } from "next/navigation";
import { useStdudentStore } from "@/store/storeProviders/UseCallStore";
import { flushSync } from "react-dom";
import { TOBE } from "@/types/constants/Tobe";

const ChatSector = () => {
  const [cuurrentChat, setCurrentChat] = useState(null);
  const [currentChatMembers, setCurrentChatMembers] = useState<TOBE>([]);
  const [currentChatMembersName, setCurrentChatMemberNames] = useState<TOBE>(
    []
  );
  const [cuurentRoom, setCurrentRoom] = useState<TOBE>();
  const { socket } = useContext(SocketContext);
  const router = useRouter();
  const { id } = useParams();
  const setStudnetId = useStdudentStore((state) => state.setStudentId);
  const setCallerSignal = useStdudentStore((state) => state.setCallerSignal);
  const setIncomingCall = useStdudentStore((state) => state.setIncomingCall);
  useEffect(() => {
    socket?.on("offer", (data) => {
      setStudnetId(data.fromCall);
      console.log("<<<<<<<<<<<<<<<<<<<^^^^&&&&&&&&&&, got call", data.signal);

      flushSync(() => {
        setCallerSignal(data.signal);
      });
      setIncomingCall(true);
      router.replace(`/courses/${id}/chat/videoCall`);
    });
  }, [socket]);

  return (
    <div className="w-[95%] md:w-[85%] mx-auto mt-2 md:flex">
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
