import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
import DoneAllIcon from '@mui/icons-material/DoneAll';
const ChatSideBar = () => {
  return (
    <div className="flex flex-[2]  h-[80vh]">
      <Card className="w-full rounded-none">
        <div className="wrapper w-[90%] mx-auto">
          <div className="searc mt-3 pb-2">
            <Input
              className="w-[90%] mx-auto rounded-xl"
              placeholder="Search here"
            />
          </div>
          <div className="user flex gap-4 mt-2 border-b border-gray-200 pb-3 ">
            <div className="profile realtive">
              <img src="/avt.png" className="w-12 h-12 rounded-full" alt="" />
              <span className="w-3 h-3 rounded-full bg-green-500 absolute bottom-0 right-0"></span>
            </div>
            <div className="info text-gray-700">
                <p >Muhammed Dilshad</p>
                <p>hey <DoneAllIcon fontSize="inherit" className="text-blue-700 text-[0.87rem]"/></p>
            </div>
          </div>

          <div className="user flex gap-4 mt-2 border-b border-gray-200 pb-3 ">
            <div className="profile realtive">
              <img src="/avt.png" className="w-12 h-12 rounded-full" alt="" />
              <span className="w-3 h-3 rounded-full bg-green-500 absolute bottom-0 right-0"></span>
            </div>
            <div className="info text-gray-700">
                <p >Muhammed Dilshad</p>
                <p>hey <DoneAllIcon fontSize="inherit" className="text-blue-700 text-[0.87rem]"/></p>
            </div>
          </div>

          <div className="user flex gap-4 mt-2 border-b border-gray-200 pb-3 ">
            <div className="profile realtive">
              <img src="/avt.png" className="w-12 h-12 rounded-full" alt="" />
              <span className="w-3 h-3 rounded-full bg-green-500 absolute bottom-0 right-0"></span>
            </div>
            <div className="info text-gray-700">
                <p >Muhammed Dilshad</p>
                <p>hey <DoneAllIcon fontSize="inherit" className="text-blue-700 text-[0.87rem]"/></p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatSideBar;
