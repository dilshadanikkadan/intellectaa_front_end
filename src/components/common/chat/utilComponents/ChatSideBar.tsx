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
import { useStdudentStore } from "@/store/storeProviders/UseCallStore";
import { useRouter } from "next/navigation";
import { TOBE } from "@/types/constants/Tobe";
interface Props {
  setCurrentChat: TOBE;
  cuurrentChat: TOBE;
  setCurrentChatMembers: TOBE;
  setCurrentChatMemberNames: TOBE;
  setCurrentRoom: TOBE;
}
const ChatSideBar = ({
  setCurrentChat,
  cuurrentChat,
  setCurrentChatMembers,
  setCurrentChatMemberNames,
  setCurrentRoom,
}: Props) => {
  const setStudentId = useStdudentStore((state) => state.setStudentId);
  const { socket, onlineUsers } = useContext(SocketContext);
  const user = useUserStore((state) => state.user);
  const [myChatrooms, setMyChatrooms] = useState<any>([]);
  const [unReadMessages, setunReadMessages] = useState<any>([]);

  const { data: myChat } = useQuery({
    queryKey: ["myChat", user?._id],
    queryFn: getMyMessageHelper,
  });

  const handleCurrentRoom = (
    id: string,
    partcipants: TOBE,
    participantDetails: TOBE,
    { roomName, roomProfile }: TOBE
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
    socket?.emit("update_roomMessage", {
      roomId: id,
      id: user?._id,
    });
    const stduentId = partcipants?.find((id: TOBE) => id !== user?._id);
    setStudentId(stduentId);
  };
  useEffect(() => {
    if (socket) {
      socket.on("recieve_msg", (data) => {
        // console.log("Received data:", data);
        setMyChatrooms((prev: TOBE) => {
          const updatedChatrooms = prev.map((chat: TOBE) => {
            if (chat._id === data?.roomId) {
              return {
                ...chat,
                lastMessage: data?.message,
                unReadMessage: data?.unReadMessage,
                updatedAt: new Date().toISOString(),
              };
            }
            return chat;
          });

          return updatedChatrooms.sort(
            (a: TOBE, b: TOBE) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        });
        setunReadMessages((prev: TOBE) => {
          const updatedMessages = { ...prev };

          if (data.roomId in updatedMessages) {
            updatedMessages[data.roomId] = [
              ...updatedMessages[data.roomId],
              ".",
            ];
          } else {
            updatedMessages[data.roomId] = ["."];
          }

          return updatedMessages;
        });
      });

      socket.on("messsge_seen", (data) => {
        setunReadMessages((prev: TOBE) => {
          const updatedMessages = { ...prev };

          if (data.roomId in updatedMessages) {
            updatedMessages[data.roomId] = [];
          }

          return updatedMessages;
        });
      });
    }
  }, [socket]);

  useEffect(() => {
    if (myChat?.success) {
      const sortedChatrooms = myChat.payload.sort(
        (a: TOBE, b: TOBE) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      setMyChatrooms(sortedChatrooms);
      const unRead = myChat.payload?.reduce((acc: TOBE, x: TOBE) => {
        var id = x._id;
        var unread = x.unReadMessage;
        acc[id] = unread;
        return acc;
      }, {});
      setunReadMessages(unRead);
    }
  }, [myChat]);
  console.log("*******", unReadMessages);

  const friend_id = (chat: TOBE) => {
    return chat?.participantDetails?.find((x: TOBE) => x?._id !== user?._id)
      ?._id;
  };
  return (
    <div
      className={`flex w-full flex-[2] overflow-y-auto ${
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
          {myChatrooms?.map((chat: TOBE, i: number) => (
            <div
            key={i}
              onClick={() =>
                handleCurrentRoom(
                  chat?._id,
                  chat?.partcipants,
                  chat?.participantDetails,
                  {
                    roomProfile:
                      chat?.roomProfile ||
                      chat?.participantDetails?.find(
                        (x: TOBE) => x?._id !== user?._id
                      )?.profile || '/avt.png',
                    roomName: chat?.roomName,
                  }
                )
              }
              className="user flex gap-4 mt-2 border-b border-gray-200 pb-3 "
            >
              <div className="profile relative ">
                {!chat?.roomProfile &&
                  onlineUsers?.includes(String(friend_id(chat))) && (
                    <p className="w-3 h-3 rounded-full bg-green-500 absolute bottom-0 right-0"></p>
                  )}
                <img
                  src={
                    chat?.roomProfile ||
                    chat?.participantDetails?.find(
                      (x: TOBE) => x?._id !== user?._id
                    )?.profile || '/avt.png'
                  }
                  className="w-14 object-cover h-12 rounded-full"
                  alt=""
                />
              </div>
              <div className="info flex justify-between  w-full text-gray-700">
                <div className="relative">
                  <p className="text-[1rem] font-semibold">
                    {chat?.roomName ||
                      chat?.participantDetails?.find(
                        (x: TOBE) => x?._id !== user?._id
                      )?.username}
                  </p>
                  <p className="text-sm flex ">
                    <span className="line-clamp-1">
                      {!chat?.lastMessage?.startsWith("http")
                        ? chat?.lastMessage || chat?.message
                        : "file shared"}
                    </span>
                    <DoneAllIcon
                      fontSize="inherit"
                      className="text-blue-700 ml-3 text-[0.87rem]"
                    />
                  </p>
                </div>
                <div>
                  <p className="text-main text-sm">
                    {moment(chat?.updatedAt).format("HH:mm")}
                  </p>
                  {/* {unReadMessages[chat?._id]?.length > 0 &&
                    cuurrentChat !== chat?._id && (
                      <span className="text-white bg-[#20B486] w-3 h-3 p-1 px-2 ml-3 rounded-full text-sm">
                        {unReadMessages[chat?._id]?.length ?? 0}
                      </span>
                    )} */}
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
