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
import ProgressTrack from "./utilComponents/ProgressTrack";
import LeaderBoard from "./utilComponents/LeaderBoard";
enum IComponents {
  WhatToday = "WhatToday",
  Course = "course",
  LeaderBoard = "LeaderBoard",
}
export default function ProfilePage() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const user = useUserStore((state) => state.user);
  const [currentView, setCurrentView] = useState<any>(IComponents.WhatToday);

  if (!user) return null;
  console.log("(((((((((", currentView);

  return (
    <div>
      {/* <NavBar /> */}
      <div className="flex   flex-col md:flex-row w-full md:w-[80%] mx-auto">
        <AvatarBar user={user} />
        <div className="flex flex-col w-full">
          <TopBarProfile
            setCurrentView={setCurrentView}
            currentView={currentView}
          />
          {currentView === "course" ? (
            <ProgressTrack />
          ) : currentView === "LeaderBoard" ? (
            <LeaderBoard />
          ) : currentView === "WhatToday" ? (
            <>
              <Attendence />
              <DailyTask />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
