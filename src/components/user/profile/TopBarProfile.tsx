import React from "react";
import ListIcon from "@mui/icons-material/List";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ChatIcon from '@mui/icons-material/Chat';
interface Props {
  setCurrentView:any
  currentView:any
}
const TopBarProfile = ({setCurrentView,currentView}:Props) => {
 
  return (
    <>
      <div className="max-w-full overflow-x-auto  border flex items-center shadow-md border-gray-300 h-20 mt-6 rounded-md ml-5">
        <div className={`${currentView ===  "WhatToday" && "text-main "} ml-5 flex items-center  rounded-md cursor-pointer`}>
          <p onClick={()=> setCurrentView("WhatToday")}>
            <ListIcon className="ml-2" /> Whats Today{" "}
          </p>
        </div>
        <div className=" p-3 ml-5 flex items-center  rounded-md cursor-pointer">
          <p>
            <ChatIcon className="ml-2"/> DisCusssion{" "}
          </p>
        </div>

        <div className={`${currentView ===  "course" && "text-main"} ml-5 flex items-center  rounded-md cursor-pointer`}>
          <p onClick={()=> setCurrentView("course")}>
            <LocalLibraryIcon  className="ml-2"/> My Course{" "}
          </p>
        </div>
        <div className=" p-3 ml-5 flex items-center  rounded-md cursor-pointer">
          <p>
            <LeaderboardIcon className="ml-2" /> LeaderBoard
          </p>
        </div>
        <div className=" p-3 ml-5 flex items-center  rounded-md">
          <p>
            <LeaderboardIcon className="ml-2" /> ChatRoom
          </p>
        </div>
      </div>
    </>
  );
};

export default TopBarProfile;
