"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useQuery } from "@tanstack/react-query";
import { getMyMessageHelper } from "@/helpers/chat/chatApiHelper";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import { SocketContext } from "@/store/storeProviders/SocketProvider";
import moment from "moment";
interface Props {
  setCurrentChat: any;
  cuurrentChat: any;
  setCurrentChatMembers: any;
  setCurrentChatMemberNames: any;
  setCurrentRoom: any;
}
const ChatSideBar = ({
  setCurrentChat,
  cuurrentChat,
  setCurrentChatMembers,
  setCurrentChatMemberNames,
  setCurrentRoom,
}: Props) => {
  const { socket } = useContext(SocketContext);
  const user = useUserStore((state) => state.user);
  const [myChatrooms, setMyChatrooms] = useState<any>([]);
  const { data: myChat } = useQuery({
    queryKey: ["myChat", user?._id],
    queryFn: getMyMessageHelper,
  });

  const handleCurrentRoom = (
    id: string,
    partcipants: any,
    participantDetails: any,
    { roomName, roomProfile }: any
  ) => {
    setCurrentChat(id);
    setCurrentChatMembers(partcipants);
    setCurrentChatMemberNames(participantDetails);
    setCurrentRoom({
      roomName,
      roomProfile,
    });
    socket?.emit("join-room", {
      roomId: id,
      id: user?._id,
    });
  };
  useEffect(() => {
    if (socket) {
      socket.on("recieve_msg", (data) => {
        console.log("Received data:", data);
        setMyChatrooms((prev: any) => {
          const updatedChatrooms = prev.map((chat: any) => {
            if (chat._id === data?.roomId) {
              return {
                ...chat,
                lastMessage: data?.message,
                updatedAt: new Date().toISOString(),
              };
            }
            return chat;
          });

          return updatedChatrooms.sort(
            (a: any, b: any) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        });
      });
    }
  }, [socket]);

  useEffect(() => {
    if (myChat?.success) {
      const sortedChatrooms = myChat.payload.sort(
        (a: any, b: any) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      setMyChatrooms(sortedChatrooms);
    }
  }, [myChat]);

  console.log("^^^^^^^^^^^^^^^^", myChatrooms);

  return (
    <div
      className={`flex w-full flex-[2] ${
        cuurrentChat && "hidden md:flex"
      }  h-[80vh]`}
    >
      <Card className="w-full rounded-none">
        <div className="wrapper w-[90%] mx-auto">
          <div className="searc mt-3 pb-2">
            <Input
              className="w-[90%] mx-auto rounded-xl"
              placeholder="Search here"
            />
          </div>
          {myChatrooms?.map((chat: any) => (
            <div
              onClick={() =>
                handleCurrentRoom(
                  chat?._id,
                  chat?.partcipants,
                  chat?.participantDetails,
                  { roomProfile: chat?.roomProfile, roomName: chat?.roomName }
                )
              }
              className="user flex gap-4 mt-2 border-b border-gray-200 pb-3 "
            >
              <div className="profile realtive">
                <img
                  src={chat?.roomProfile}
                  className="w-14 object-cover h-12 rounded-full"
                  alt=""
                />
                <span className="w-4 h-4 rounded-full bg-green-500 absolute bottom-0 right-0"></span>
              </div>
              <div className="info flex justify-between  w-full text-gray-700">
                <div>
                  <p className="text-[1rem] font-semibold">{chat?.roomName}</p>
                  <p className="text-sm ">
                    <span className="line-clamp-1">
                      {!chat?.lastMessage?.startsWith("http")
                        ? chat?.lastMessage || chat?.message
                        : "file shared"}
                    </span>
                    <DoneAllIcon
                      fontSize="inherit"
                      className="text-blue-700 text-[0.87rem]"
                    />
                  </p>
                </div>
                <div>
                  <p className="text-main text-sm">
                    {moment(chat?.updatedAt).format("HH:mm")}
                  </p>
                  <span className="text-white bg-[#20B486] px-2 py-1 ml-3 rounded-full text-sm">
                    7
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ChatSideBar;
