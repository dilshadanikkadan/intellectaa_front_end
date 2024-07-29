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
import SubmissionMine from "./utilComponents/SubmissionMine";
import { TOBE } from "@/types/constants/Tobe";

enum IComponents {
  WhatToday = "WhatToday",
  Course = "course",
  LeaderBoard = "LeaderBoard",
}
export default function ProfilePage() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const user = useUserStore((state) => state.user);
  const [currentView, setCurrentView] = useState<any>(IComponents.WhatToday);
  const [myCourse, setMyCourse] = useState<TOBE>(null);
  if (!user) return null;
  console.log("(((((((((", currentView);

  const hanldeMyCourse = (course:TOBE) => {
    setMyCourse(course);
  };
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
            <ProgressTrack hanldeMyCourse={hanldeMyCourse} />
          ) : currentView === "LeaderBoard" ? (
            <LeaderBoard />
          ) : currentView === "Submission" ? (
            <SubmissionMine />
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
