import React from "react";
import ListIcon from "@mui/icons-material/List";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ChatIcon from '@mui/icons-material/Chat';
const TopBarProfile = () => {
  return (
    <>
      <div className="max-w-full overflow-x-auto  border flex items-center shadow-md border-gray-300 h-20 mt-6 rounded-md ml-5">
        <div className="ml-5 flex items-center  rounded-md">
          <p>
            <ListIcon className="ml-2" /> Whats Today{" "}
          </p>
        </div>
        <div className=" p-3 ml-5 flex items-center  rounded-md">
          <p>
            <ChatIcon className="ml-2"/> DisCusssion{" "}
          </p>
        </div>

        <div className=" p-3 ml-5 flex items-center  rounded-md">
          <p>
            <LocalLibraryIcon className="ml-2"/> Courser{" "}
          </p>
        </div>
        <div className=" p-3 ml-5 flex items-center  rounded-md">
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
