"use client";
import { Card } from "@/components/ui/card";
import {
  getMyMessageHelper,
  sendNewMessageHelper,
} from "@/helpers/chat/chatApiHelper";
import { SocketContext } from "@/store/storeProviders/SocketProvider";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import { TOBE } from "@/types/constants/Tobe";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
interface Props {
  currentChatMembers: TOBE;
  forWardMessage: TOBE;
  setForWardMessage: TOBE;
}
const ForwardMessages = ({
  currentChatMembers,
  forWardMessage,
  setForWardMessage,
}: Props) => {
  const user = useUserStore((state) => state.user);
  const { socket, rooms } = useContext(SocketContext);
  const [myChatrooms, setMyChatrooms] = useState<any>([]);
  const [forWardRoom, setForWardRoom] = useState<any>();
  const { data: myChat } = useQuery({
    queryKey: ["myChat", user?._id],
    queryFn: getMyMessageHelper,
  });
  const queryClient = useQueryClient();

  const { mutate: newMessageMutate } = useMutation({
    mutationFn: sendNewMessageHelper,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["messages"] as any);
    },
  });

  const handleFoeWard = () => {
    const isActiveRoom = rooms[forWardRoom]?.length > 1;
    newMessageMutate({
      roomId: forWardRoom,
      senderId: user?._id,
      message: forWardMessage,
      read: isActiveRoom ? true : false,
    });
    socket?.emit("send_msg", {
      roomId: forWardRoom,
      message: forWardMessage,
      senderId: user?._id,
      partcipants: currentChatMembers,
      forWard:true
    });
    setForWardMessage("");
  };

  return (
    <div className="h-full overflow-hidden   absolute left-1/2 top-1/2 z-50 translate-x-[-50%] translate-y-[-50%] flex items-center justify-center">
      <Card className="h-96 w-72">
        <p className="font-semibold py-3 ml-3">Forward to ...</p>
        <div className="flex flex-col w-[90%]  h-[70%] mx-auto">
          {myChat?.payload?.map((chat: TOBE) => (
            <div
              onClick={() => setForWardRoom(chat?._id)}
              className={`user flex gap-4 mt-2 border-b border-gray-200 pb-3 ${
                forWardRoom === chat?._id ? "bg-green-100" : ""
              } `}
            >
              <div className="profile realtive">
                <img
                  src={chat?.roomProfile}
                  className="w-14 object-cover h-12 rounded-full"
                  alt=""
                />
              </div>
              <div className="info flex justify-between  w-full text-gray-700">
                <div>
                  <p className="text-[1rem] font-semibold">{chat?.roomName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => handleFoeWard()}
          className="px-3 ml-[70%] py-1.5 bg-[#20B486] rounded-md text-white"
        >
          Send
        </button>
      </Card>
    </div>
  );
};

export default ForwardMessages;
