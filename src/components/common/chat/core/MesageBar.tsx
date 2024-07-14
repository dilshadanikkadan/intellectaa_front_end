"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { getMessageHelper } from "@/helpers/chat/chatApiHelper";
import TextMessage from "../utilComponents/TextMessage";
import SendMessageBar from "../utilComponents/SendMessageBar";
import { SocketContext } from "@/store/storeProviders/SocketProvider";
import { flushSync } from "react-dom";
import ImageSend from "../utilComponents/ImageSend";
import ImageMessage from "../utilComponents/ImageMessage";
interface Props {
  cuurrentChatId: any;
}
const MesageBar = ({ cuurrentChatId }: Props) => {
  const [messages, setMessages] = useState<any>([]);
  const { socket, rooms, onlineUsers } = useContext(SocketContext);
  const [image, setImage] = useState<string>("");
  const [imageFile, setImageFile] = useState<string>("");

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
    if (socket) {
      socket.on("recieve_msg", (data) => {
        // console.log("Test event received:", data);
        setMessages((prev: any) => [...prev, data]);
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
        <div className="wrapper relative h-[80vh] w-full flex flex-col bg-[#F0FAF7] justify-between border-r border-b border-gray-300">
          {image && (
            <ImageSend
              cuurrentChatId={cuurrentChatId}
              image={image}
              setMessages={setMessages}
              setImage={setImage}
              imageFile={imageFile}
            />
          )}

          <Card className="w-full h-[5rem] rounded-none flex items-center">
            <div className="left flex-[1] flex ml-5  gap-5 ">
              <img
                src="/avt.png"
                className="w-12 h-12 object-cover rounded-full "
                alt=""
              />
              <div>
                <p className="text-md font-semibold">Dilshad</p>

                <p className="text-sm">last seen today at 12:00 am</p>
              </div>
            </div>
            <div className="right flex-[1]"></div>
          </Card>

          <div className="chatBody w-[95%] overflow-y-scroll mx-auto">
            {messages?.map((msg: any) => (
              <>
                {msg?.typeMessage === "image" ? (
                  <ImageMessage msg={msg} />
                ) : (
                  <TextMessage msg={msg} />
                )}
              </>
            ))}
          </div>
          <SendMessageBar
            setMessages={setMessages}
            cuurrentChatId={cuurrentChatId}
            setImage={setImage}
            setImageFile={setImageFile}
          />
        </div>
      )}
    </div>
  );
};

export default MesageBar;
