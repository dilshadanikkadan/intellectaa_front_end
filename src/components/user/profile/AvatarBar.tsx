import { Card } from "@/components/ui/card";
import React from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatIcon from "@mui/icons-material/Chat";
import { User } from "@/store/storeProviders/UseUserStore";
import Image from "next/image";
import { EditProfile } from "./ProfileUpdateModal";
type AvatarBarProps = {
  user: User | null;
};
const AvatarBar = ({ user }: AvatarBarProps) => {
  return (
    <Card className="w-[90%] mx-auto md:w-[25%]  flex flex-col  p-3 h-[28rem] mt-5 ">
      <div className="warapper flex gap-4">
        <Image
          src={user?.image || "/avt.png"}
          alt={user?.name || "User"}
          width={70}
          height={70}
          onError={() => console.error("Image failed to load")}
        />
        <p>{user?.username ?? user?.name}</p>
      </div>
      <button className=" text-[#20B486] mt-3 bg-white border border-[#20B486] px-7 py-[6px]  ">
        <EditProfile/>
      </button>
      <div className="w-full mt-3">
        <div className="flex gap-5">
          <RemoveRedEyeIcon className="text-blue-400" />
          <div className="text-[0.9rem] ">
            <p>views</p>
            <p>Last week 0</p>
          </div>
        </div>
      </div>

      <div className="w-full mt-3">
        <div className="flex gap-5">
          <ThumbUpIcon className="text-blue-400" />
          <div className="text-[0.8rem]">
            <p>likes</p>
            <p>Last week 0</p>
          </div>
        </div>
      </div>
      <div className="w-full mt-3">
        <div className="flex gap-5">
          <ChatIcon className="text-[#20B486]" />
          <div className="text-[0.8rem]">
            <p>discussion</p>
            <p>Last week 0</p>
          </div>
        </div>
      </div>
      <div className="w-full mt-3">
        <div className="flex gap-5">
          <RemoveRedEyeIcon className="text-blue-400" />
          <div className="text-[0.8rem]">
            <p>views</p>
            <p>Last week 0</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AvatarBar;
