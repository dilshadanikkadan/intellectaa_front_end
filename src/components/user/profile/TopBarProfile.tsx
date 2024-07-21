import React from "react";
import ListIcon from "@mui/icons-material/List";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ChatIcon from '@mui/icons-material/Chat';

interface Props {
  setCurrentView: (view: string) => void;
  currentView: string;
}

const TopBarProfile: React.FC<Props> = ({setCurrentView, currentView}) => {
  const menuItems = [
    { id: "WhatToday", label: "What's Today", icon: ListIcon },
    { id: "Discussion", label: "Discussion", icon: ChatIcon },
    { id: "course", label: "My Course", icon: LocalLibraryIcon },
    { id: "LeaderBoard", label: "Leaderboard", icon: LeaderboardIcon },
    { id: "ChatRoom", label: "Chat Room", icon: ChatIcon },
  ];

  return (
    <nav className="max-w-full overflow-x-auto border shadow-md border-gray-300 rounded-md mt-6 ml-5">
      <ul className="flex items-center h-20 ">
        {menuItems.map((item) => (
          <li key={item.id} className="flex-1">
            <button
              onClick={() => setCurrentView(item.id)}
              className={`w-full h-full flex items-center justify-center space-x-2 transition-colors
                ${currentView === item.id 
                  ? "text-main " 
                  : "text-gray-600 hover:bg-gray-50 py-1.5 rounded-xl"}`}
            >
              <item.icon className="text-2xl " />
              <span className="hidden md:block">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TopBarProfile;