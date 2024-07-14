"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useContext } from "react";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useQuery } from "@tanstack/react-query";
import { getMyMessageHelper } from "@/helpers/chat/chatApiHelper";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import { SocketContext } from "@/store/storeProviders/SocketProvider";

interface Props {
  setCurrentChat: any;
  cuurrentChat:any
}
const ChatSideBar = ({ setCurrentChat ,cuurrentChat}: Props) => {
  const {socket} = useContext(SocketContext)
  const user = useUserStore((state) => state.user);
  const { data: myChat } = useQuery({
    queryKey: ["myChat", user?._id],
    queryFn: getMyMessageHelper,
  });

  const handleCurrentRoom=(id:string)=>{
    setCurrentChat(id)
    socket?.emit('join-room',({
      roomId:id,
      id:user?._id
    }))
  }
  return (
    <div className={`flex w-full flex-[2] ${cuurrentChat && "hidden md:flex"}  h-[80vh]`}>
      <Card className="w-full rounded-none">
        <div className="wrapper w-[90%] mx-auto">
          <div className="searc mt-3 pb-2">
            <Input
              className="w-[90%] mx-auto rounded-xl"
              placeholder="Search here"
            />
          </div>
          {myChat?.payload.map((chat: any) => (
            <div onClick={()=> handleCurrentRoom(chat?._id)}  className="user flex gap-4 mt-2 border-b border-gray-200 pb-3 ">
              <div className="profile realtive">
                <img src="/avt.png" className="w-12 h-12 rounded-full" alt="" />
                <span  className="w-3 h-3 rounded-full bg-green-500 absolute bottom-0 right-0"></span>
              </div>
              <div className="info flex justify-between  w-full text-gray-700">
                <div>
                  <p className="text-sm">Muhammed Dilshad</p>
                  <p className="text-sm">
                    hey{" "}
                    <DoneAllIcon
                      fontSize="inherit"
                      className="text-blue-700 text-[0.87rem]"
                    />
                  </p>
                </div>
                <div>
                  <p className="text-main ">5:09 pm</p>
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
