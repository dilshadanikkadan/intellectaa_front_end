import NavBar from "@/components/common/NavBar";
import Attendence from "@/components/user/profile/Attendence";
import AvatarBar from "@/components/user/profile/AvatarBar";
import DailyTask from "@/components/user/profile/DailyTask";
import TopBarProfile from "@/components/user/profile/TopBarProfile";
import React from "react";

const page = () => {
  return (
    <div>
      <NavBar />
      <div className="flex w-[80%] mx-auto">
        {/* <AvatarBar user={} /> */}
        <div className="flex flex-col w-full">
          <TopBarProfile />
          <Attendence /> 
          <DailyTask/>        
        </div>
      </div>
    </div>
  );
};

export default page;
