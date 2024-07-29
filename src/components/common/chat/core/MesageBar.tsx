"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useRef, useState } from "react";
import PushPinIcon from "@mui/icons-material/PushPin";
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
import VideocamIcon from "@mui/icons-material/Videocam";
import { useRouter } from "next/navigation";
import VoiceMessage from "../utilComponents/voiceMessage";
import { TOBE } from "@/types/constants/Tobe";
import { currentUserHelper } from "@/helpers/api/auth/authApiHelper";
interface Props {
  cuurrentChatId: TOBE;
  currentChatMembers: TOBE;
  currentChatMembersName: TOBE;
  cuurentRoom: TOBE;
}
const MesageBar = ({
  cuurrentChatId,
  currentChatMembers,
  currentChatMembersName,
  cuurentRoom,
}: Props) => {
  const [messages, setMessages] = useState<TOBE>([]);
  const router = useRouter();
  const { socket, rooms, onlineUsers } = useContext(SocketContext);
  const [image, setImage] = useState<string>("");
  const [imageFile, setImageFile] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [typerId, setTyperId] = useState<string>("");
  const [isReply, setIsReply] = useState<TOBE>(null);
  const [forWardMessage, setForWardMessage] = useState<TOBE>(null);
  const [cameraOn, setCameraOn] = useState<boolean>(false);
  const [loading, setLoading] = useState<TOBE>(false);
  const currentUser = useUserStore((state) => state.user);
  const user = useUserStore((state) => state.user);
  const messageRef = useRef<TOBE>();
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
        if (!data.forWard) {
          setMessages((prev: TOBE) => [...prev, data]);
        }
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
          setMessages((prev: TOBE) =>
            prev.map((msg: TOBE) => ({ ...msg, read: true }))
          );
        });
      });
    }
  }, [socket]);

  const pinned_message = messages
    ?.filter((msg: TOBE) => msg?.pinned == true)
    ?.at(-1);

  console.log("|||||||||||||||||||", pinned_message);

  return (
    <div className="flex-[5] flex w-full">
      {!cuurrentChatId ? (
        <div className="h-[80vh] hidden md:flex items-center justify-center border-t border-r border-b border-gray-300 w-full">
          <p className="text-3xl text-gray-500 font-semibold">Open A Chat</p>
        </div>
      ) : (
        <div
          style={{ backgroundImage: `url(/bgChat.png)` }}
          className=" relative h-[80vh] w-full flex flex-col bg-[#F0FAF7]  border-r border-b border-gray-300"
        >
          {cameraOn && !loading && (
            <Camera
              setCameraOn={setCameraOn}
              setLoading={setLoading}
              cuurrentChatId={cuurrentChatId}
            />
          )}
          {forWardMessage && (
            <ForwardMessages
              setForWardMessage={setForWardMessage}
              forWardMessage={forWardMessage}
              currentChatMembers={currentChatMembers}
            />
          )}
          {image && !loading && (
            <ImageSend
              cuurrentChatId={cuurrentChatId}
              image={image}
              setMessages={setMessages}
              setImage={setImage}
              imageFile={imageFile}
              setLoading={setLoading}
            />
          )}

          <Card className="w-full h-[6rem]  rounded-none flex items-center">
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
                        (x: TOBE) => x._id === typerId
                      ).username
                    }{" "}
                    typing.....
                  </p>
                ) : (
                  <div className="flex">
                    {currentChatMembersName
                      ?.filter(
                        (user: TOBE) => user._id !== currentUser?._id
                      )
                      .map((user: TOBE, i: number) => (
                        <p key={i} className="text-sm">
                          {user?.username} ,
                        </p>
                      ))}
                  </div>
                )}
              </div>
            </div>
            <div className="right flex-[1] flex justify-end mr-10 cursor-pointer">
              <VideocamIcon
                onClick={() =>
                  router.push(
                    `/courses/66915ba51b8371f06fcddb22/chat/videoCall`
                  )
                }
                fontSize="large"
                className="text-gray-600"
              />
            </div>
          </Card>
          {pinned_message && (
            <Card className="h-12 cursor-pointer rounded-none flex gap-3 items-center  ">
              <PushPinIcon
                fontSize="inherit"
                className="ml-3 text-[1.3rem] text-gray-500"
              />
              <p className="text-sm text-gray-500">{pinned_message?.message}</p>
            </Card>
          )}
          <div className="chatBody w-[95%] h-[90%] mt-3 overflow-y-scroll mx-auto">
            {messages?.map((msg: TOBE, i: TOBE) => (
              <>
                {msg?.typeMessage === "image" ? (
                  <ImageMessage
                    key={i}
                    currentChatMembersName={currentChatMembersName}
                    msg={msg}
                  />
                ) : msg?.typeMessage === "reply" ? (
                  <ReplyMessage
                  key={i}
                    currentChatMembers={currentChatMembers}
                    currentChatMembersName={currentChatMembersName}
                    msg={msg}
                  />
                ) : msg?.typeMessage === "audio" ? (
                  <VoiceMessage
                    msg={msg}
                    key={i}
                    currentChatMembers={currentChatMembers}
                    currentChatMembersName={currentChatMembersName}
                  />
                ) : (
                  <TextMessage
               
                    setForWardMessage={setForWardMessage}
                    messageRef={messageRef}
                    setIsReply={setIsReply}
                    msg={msg}
                    cuurrentChatId={cuurrentChatId}
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
          
            loading={loading}
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
