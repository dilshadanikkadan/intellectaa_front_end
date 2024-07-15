"use client";
import React, { useState } from "react";
import ChatSideBar from "../utilComponents/ChatSideBar";
import MesageBar from "./MesageBar";

const ChatSector = () => {
  const [cuurrentChat, setCurrentChat] = useState(null);
  const [currentChatMembers, setCurrentChatMembers] = useState<any>([]);
  const [currentChatMembersName, setCurrentChatMemberNames] = useState<any>([]);
  const [cuurentRoom,setCurrentRoom]= useState<any>()
  return (
    <div className="w-[80%] mx-auto mt-2 md:flex">
      <ChatSideBar
        setCurrentChat={setCurrentChat}
        cuurrentChat={cuurrentChat}
        setCurrentChatMembers={setCurrentChatMembers}
        setCurrentChatMemberNames={setCurrentChatMemberNames}
        setCurrentRoom={setCurrentRoom}
      />
      <MesageBar cuurentRoom={cuurentRoom} currentChatMembersName={currentChatMembersName} cuurrentChatId={cuurrentChat} currentChatMembers={currentChatMembers} />
    </div>
  );
};

export default ChatSector;
