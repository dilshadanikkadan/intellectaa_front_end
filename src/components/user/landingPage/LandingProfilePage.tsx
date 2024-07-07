"use client";
import NavBar from "@/components/common/NavBar";
import Attendence from "@/components/user/profile/Attendence";
import AvatarBar from "@/components/user/profile/AvatarBar";
import DailyTask from "@/components/user/profile/DailyTask";
import TopBarProfile from "@/components/user/profile/TopBarProfile";
import { useUserStore } from "@/store/storeProviders/UseUserStore";

export default function ProfilePage() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const user = useUserStore((state) => state.user);
 
  if (!isAuthenticated) return null;

  return (
    <div>
      {/* <NavBar /> */}
      <div className="flex  flex-col md:flex-row w-full md:w-[80%] mx-auto">
        <AvatarBar user={user} />
        <div className="flex flex-col w-full">
          <TopBarProfile />
          <Attendence />
          <DailyTask />
        </div>
      </div>
    </div>
  );
}
