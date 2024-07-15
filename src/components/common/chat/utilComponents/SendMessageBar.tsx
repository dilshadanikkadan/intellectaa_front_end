"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useContext, useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendNewMessageHelper } from "@/helpers/chat/chatApiHelper";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import { SocketContext } from "@/store/storeProviders/SocketProvider";
import ImageIcon from "@mui/icons-material/Image";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ImageSend from "./ImageSend";
import CloseIcon from "@mui/icons-material/Close";
interface Props {
  cuurrentChatId: any;
  setMessages: any;
  setImage: any;
  setImageFile: any;
  currentChatMembers: any;
  isReply: any;
  setIsReply: any;
  setCameraOn: any;
}

const SendMessageBar = ({
  cuurrentChatId,
  setMessages,
  setImage,
  setImageFile,
  currentChatMembers,
  isReply,
  setIsReply,
  setCameraOn
}: Props) => {
  const { socket, rooms } = useContext(SocketContext);
  const [msgValue, setMsgValue] = useState<string>("");
  const [showImageIcons, setShowImageIcons] = useState<boolean>(false);
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();
  const { mutate: newMessageMutate } = useMutation({
    mutationFn: sendNewMessageHelper,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["messages"] as any);
    },
  });

  const handleSendMessage = () => {
    if (!msgValue) return;
    const isActiveRoom = rooms[cuurrentChatId]?.length > 1;

    if (isReply) {
      newMessageMutate({
        roomId: cuurrentChatId,
        senderId: user?._id,
        message: msgValue,
        read: isActiveRoom ? true : false,
        replyTo: isReply?.replyTo,
        replyMessage: isReply?.message,
        typeMessage: "reply",
      });

      socket?.emit("send_msg", {
        roomId: cuurrentChatId,
        message: msgValue,
        senderId: user?._id,
        partcipants: currentChatMembers,
        replyTo: isReply?.replyTo,
        replyMessage: isReply?.message,
        typeMessage: "reply",
      });
      setIsReply(null);
      setMsgValue("");
      return;
    }
    newMessageMutate({
      roomId: cuurrentChatId,
      senderId: user?._id,
      message: msgValue,
      read: isActiveRoom ? true : false,
    });
    socket?.emit("send_msg", {
      roomId: cuurrentChatId,
      message: msgValue,
      senderId: user?._id,
      partcipants: currentChatMembers,
    });

    setMsgValue("");
  };

  const handleImageSend = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  };
  return (
    <>
      <div className="w-full ml-3 relative h-10 flex mb-2">
        {showImageIcons && (
          <div className="absolute right-[9%] top-[-90px] flex flex-col items-end">
            <Card className="flex items-center justify-center ml-2 py-2.5 px-2 rounded-xl mb-2 cursor-pointer">
              <label
                htmlFor="upload-thumbnail"
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <ImageIcon fontSize="inherit" className="text-[2rem]" />
              </label>
              <input
                onChange={handleImageSend}
                id="upload-thumbnail"
                type="file"
                className="hidden"
              />
            </Card>
            <Card onClick={()=> setCameraOn(true)} className="flex items-center justify-center ml-2 py-2.5 px-2 rounded-xl cursor-pointer">
              <PhotoCameraIcon fontSize="inherit" className="text-[2rem]" />
            </Card>
          </div>
        )}
        {isReply && (
          <Card className="h-20 w-[80%] top-[-83px] absolute">
            <div className="w-[95%] mt-1  mx-auto my-auto bg-[#F0FAF7] border-l-2 border-green-500 h-[90%]">
              <div className="pt-3 pl-3  ">
                <p className="font-semibold">{isReply?.replyTo}</p>
                <p className="text-[1rem]">{isReply?.message}</p>
              </div>
            </div>
            <CloseIcon
              fontSize="inherit"
              onClick={() => setIsReply(null)}
              className="cursor-pointer absolute text-gray-800 text-[0.87rem] top-0 right-0"
            />
          </Card>
        )}
        <Input
          value={msgValue}
          onChange={(e) => {
            setMsgValue(e.target.value);
            socket?.emit("typing", {
              roomId: cuurrentChatId,
              typerId: user?._id,
            });
          }}
          className="max-w-[80%] rounded-lg"
          placeholder="Type Message here........."
        />
        <Card className="flex items-center justify-center ml-2 px-2 rounded-xl">
          <KeyboardVoiceIcon fontSize="inherit" className="text-[2rem]" />
        </Card>
        <Card
          className="flex items-center justify-center ml-2 px-2 rounded-xl cursor-pointer"
          onClick={() => setShowImageIcons(!showImageIcons)}
        >
          <AttachFileIcon fontSize="inherit" className="text-[2rem]" />
        </Card>
        <Card
          onClick={handleSendMessage}
          className="flex items-center justify-center ml-2 px-2 rounded-xl cursor-pointer"
        >
          <SendIcon fontSize="inherit" className="text-[2rem]" />
        </Card>

        {/* {
        image && 
        } */}
      </div>
    </>
  );
};

export default SendMessageBar;
