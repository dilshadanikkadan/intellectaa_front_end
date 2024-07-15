"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useRef, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { getMessageHelper } from "@/helpers/chat/chatApiHelper";
import TextMessage from "../utilComponents/TextMessage";
import SendMessageBar from "../utilComponents/SendMessageBar";
import { SocketContext } from "@/store/storeProviders/SocketProvider";
import { flushSync } from "react-dom";
import ImageSend from "../utilComponents/ImageSend";
import ImageMessage from "../utilComponents/ImageMessage";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import ReplyMessage from "../utilComponents/ReplyMessage";
import ForwardMessages from "../utilComponents/ForwardMessages";
import Camera from "../utilComponents/Camera";
interface Props {
  cuurrentChatId: any;
  currentChatMembers: any;
  currentChatMembersName: any;
  cuurentRoom: any;
}
const MesageBar = ({
  cuurrentChatId,
  currentChatMembers,
  currentChatMembersName,
  cuurentRoom,
}: Props) => {
  const [messages, setMessages] = useState<any>([]);
  const { socket, rooms, onlineUsers } = useContext(SocketContext);
  const [image, setImage] = useState<string>("");
  const [imageFile, setImageFile] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [typerId, setTyperId] = useState<string>("");
  const [isReply, setIsReply] = useState<any>(null);
  const [forWardMessage, setForWardMessage] = useState<any>(null);
  const [cameraOn, setCameraOn] = useState<boolean>(false);

  const user = useUserStore((state) => state.user);
  const messageRef = useRef<any>();
  const { data: currentChatMessages } = useQuery({
    queryKey: ["messages", cuurrentChatId],
    queryFn: getMessageHelper,
    enabled: !!cuurrentChatId,
  });

  useEffect(() => {
    if (cuurrentChatId) {
      setMessages(currentChatMessages?.payload);
    }
  }, [currentChatMessages, cuurrentChatId]);
  useEffect(() => {
    if (messages) {
      messageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  useEffect(() => {
    if (socket) {
      socket.on("recieve_msg", (data) => {
        setMessages((prev: any) => [...prev, data]);
      });

      socket.on("typing_recieve", ({ typerId }) => {
        setTyperId(typerId);
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      });
      flushSync(() => {
        socket.on("messsge_seen", () => {
          setMessages((prev: any) =>
            prev.map((msg: any) => ({ ...msg, read: true }))
          );
        });
      });
    }
  }, [socket]);

  return (
    <div className="flex-[5] flex w-full">
      {!cuurrentChatId ? (
        <div className="h-[80vh] hidden md:flex items-center justify-center border-t border-r border-b border-gray-300 w-full">
          <p className="text-3xl text-gray-500 font-semibold">Open A Chat</p>
        </div>
      ) : (
        <div
          style={{ backgroundImage: `url(/bgChat.png)` }}
          className="wrapper relative h-[80vh] w-full flex flex-col bg-[#F0FAF7] justify-between border-r border-b border-gray-300"
        >
          {cameraOn && <Camera setCameraOn={setCameraOn} cuurrentChatId={cuurrentChatId} />}
          {forWardMessage && (
            <ForwardMessages
              setForWardMessage={setForWardMessage}
              forWardMessage={forWardMessage}
              currentChatMembers={currentChatMembers}
            />
          )}
          {image && (
            <ImageSend
              cuurrentChatId={cuurrentChatId}
              image={image}
              setMessages={setMessages}
              setImage={setImage}
              imageFile={imageFile}
            />
          )}

          <Card className="w-full min-h-[5rem] rounded-none flex items-center">
            <div className="left flex-[1] flex ml-5  gap-5 ">
              <img
                src={cuurentRoom?.roomProfile}
                className="w-12 h-12 object-cover rounded-full "
                alt=""
              />
              <div>
                <p className="text-md font-semibold">{cuurentRoom?.roomName}</p>
                {isTyping && typerId !== user?._id ? (
                  <p className="text-main text-sm">
                    {
                      currentChatMembersName?.find(
                        (x: any) => x._id === typerId
                      ).username
                    }{" "}
                    typing.....
                  </p>
                ) : (
                  <div className="flex ">
                    {currentChatMembersName?.map((user: any) => (
                      <p className="text-sm">{user?.username} ,</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="right flex-[1]"></div>
          </Card>

          <div className="chatBody w-[95%] overflow-y-scroll mx-auto">
            {messages?.map((msg: any, i: any) => (
              <>
                {msg?.typeMessage === "image" ? (
                  <ImageMessage msg={msg} />
                ) : msg?.typeMessage === "reply" ? (
                  <ReplyMessage
                    currentChatMembers={currentChatMembers}
                    currentChatMembersName={currentChatMembersName}
                    msg={msg}
                  />
                ) : (
                  <TextMessage
                    setForWardMessage={setForWardMessage}
                    messageRef={messageRef}
                    setIsReply={setIsReply}
                    msg={msg}
                    currentChatMembersName={currentChatMembersName}
                    onDelete={() => {}}
                    key={i}
                    onForward={() => {}}
                    onReply={() => {}}
                  />
                )}
              </>
            ))}
          </div>
          <SendMessageBar
            setCameraOn={setCameraOn}
            setMessages={setMessages}
            isReply={isReply}
            setIsReply={setIsReply}
            cuurrentChatId={cuurrentChatId}
            setImage={setImage}
            setImageFile={setImageFile}
            currentChatMembers={currentChatMembers}
          />
        </div>
      )}
    </div>
  );
};

export default MesageBar;
