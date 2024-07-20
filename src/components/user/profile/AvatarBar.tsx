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
      <div className="warapper py-2 flex items-center justify-center flex-col gap-4">
        <div className="w-20 h-20 relative">
          <Image
            src={user?.image || user?.profile || "/avt.png"}
            alt={user?.name || "User"}
            fill
            objectFit="cover"
            className="rounded-full"
            onError={() => console.error("Image failed to load")}
          />
        </div>

        <p className="font-semibold">{user?.username ?? user?.name}</p>
      </div>
      <button className=" text-[#20B486] mt-3 font-semibold  rounded-md  bg-[#EFF9F2] px-7 py-[4px]  ">
        <EditProfile />
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
