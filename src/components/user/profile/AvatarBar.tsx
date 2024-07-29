"use cleint";
import { Card } from "@/components/ui/card";
import {memo} from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatIcon from "@mui/icons-material/Chat";
import { User, useUserStore } from "@/store/storeProviders/UseUserStore";
import Image from "next/image";
import { EditProfile } from "./ProfileUpdateModal";
import { useQuery } from "@tanstack/react-query";
import {
  getMyEntrollHelper,
  getMylikesHelper,
} from "@/helpers/course/courseApiHelper";
type AvatarBarProps = {
  user: User | null;
};

const AvatarBar = ({ user }: AvatarBarProps) => {
  const me = useUserStore((state) => state.user);

  const { data: MyData } = useQuery({
    queryKey: ["my key"],
    queryFn: () => getMylikesHelper(me?._id),
  });

  console.log("_______________*", MyData?.payload);
  const { data: MyEntroll, isLoading } = useQuery({
    queryFn: getMyEntrollHelper,
    queryKey: ["myEntroll", me?._id],
  });
  return (
    <>
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
            <p>Course Purchased</p>
            <p>Last week {MyEntroll?.payload?.length}</p>
          </div>
        </div>
      </div>

      <div className="w-full mt-3">
        <div className="flex gap-5">
          <ThumbUpIcon className="text-blue-400" />
          <div className="text-[0.8rem]">
            <p>likes</p>
            <p>achived {MyData?.payload[0]?.totalLikes}</p>
          </div>
        </div>
      </div>
      <div className="w-full mt-3">
        <div className="flex gap-5">
          <ChatIcon className="text-[#20B486]" />
          <div className="text-[0.8rem]">
            <p>Submission</p>
            <p>Last week {MyData?.payload[0]?.totalSubmissions}</p>
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
    </>
  );
};

export default memo(AvatarBar);
