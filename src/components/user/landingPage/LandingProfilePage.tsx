"use client";
import NavBar from "@/components/common/NavBar";
import Attendence from "@/components/user/profile/Attendence";
import AvatarBar from "@/components/user/profile/AvatarBar";
import DailyTask from "@/components/user/profile/DailyTask";
import TopBarProfile from "@/components/user/profile/TopBarProfile";
import { useUser } from "@/hooks/UseUser";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

export default function ProfilePage() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const [currentUser, setcurrentUser] = useState<any | null>(null);
  if (!isAuthenticated) return null;

  useEffect(() => {
    const setUser = async () => {
    const res =await useUser();
    setcurrentUser(res);
    };
    setUser()
   
  }, []);

  console.log("*********", currentUser);

  return (
    <div>
      {/* <NavBar /> */}
      <div className="flex  flex-col md:flex-row w-full md:w-[80%] mx-auto">
        <AvatarBar user={currentUser} />
        <div className="flex flex-col w-full">
          <TopBarProfile />
          <Attendence />
          <DailyTask />
        </div>
      </div>
    </div>
  );
}
