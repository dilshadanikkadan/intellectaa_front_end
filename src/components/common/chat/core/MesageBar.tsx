import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
const MesageBar = () => {
  return (
    <div className="flex-[5] flex w-full">
      <div className="wrapper h-[80vh] w-full flex flex-col bg-[#F0FAF7] justify-between border-r border-b border-gray-300">
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

        <div className="w-full ml-3  h-10 flex mb-2">

          <Input  className="w-[80%] rounded-lg " placeholder="Type Message here........."/>
          <Card className=" flex items-center justify-center ml-2 px-2 rounded-xl ">
            <KeyboardVoiceIcon fontSize="inherit" className="text-[2rem]"/>
          </Card>
          <Card className=" flex items-center justify-center ml-2 px-2 rounded-xl ">
            <AttachFileIcon fontSize="inherit" className="text-[2rem]"/>
          </Card>
          <Card className=" flex items-center justify-center ml-2 px-2 rounded-xl ">
            <SendIcon fontSize="inherit" className="text-[2rem]"/>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MesageBar;
