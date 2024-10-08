"use client";
import React, { useState } from "react";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatIcon from "@mui/icons-material/Chat";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import { logoutHelper } from "@/helpers/api/auth/authApiHelper";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const InstructorSideNav = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const {
    logoutSuccess,
  } = useUserStore();

  const { mutate: logoutMutate, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutHelper,
    onSuccess: async (data) => {
      if (data?.success) {
        console.log("Logout successful");
        await handleLogout();
        router.push("/");
      }
    },
    //
    onError: (error) => {
      console.error("Logout failed", error);
    },
  });
  const handleLogout = async () => {
    logoutSuccess();
    router.push("/");
  };
  const navItems = [
    { icon: <DashboardIcon />, name: "Dashboard", href: "/instructor" },
    { icon: <PeopleIcon />, name: "My Courses", href: "/instructor/myCourses" },
    // { icon: <PeopleIcon />, name: "Students", href: "/instructor/students" },
    { icon: <ChatIcon />, name: "Messages", href: "/instructor/messages" },
  ];

  return (
    <section
      className={`fixed top-0 left-0 h-[100vh] bg-[#2D2F31]  transition-all duration-300 z-50
        ${isExpanded ? "w-[70%] md:w-[22%]" : "w-[5%] md:w-[5%]"}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div
        className={`wrapper ${
          isExpanded ? "w-[80%]" : "w-[100%]"
        } mx-auto pt-10 font-semibold`}
      >
        <h3
          className={`text-2xl text-white ${isExpanded ? "" : "text-center"}`}
        >
          {isExpanded ? "Instructor" : "I"}
        </h3>
        <nav className="w-full mt-10">
          {navItems.map((item, index) => (
            <Link href={item.href} key={index}>
              <div className="flex gap-4 text-white py-3 px-6 rounded-lg mt-5 hover:bg-gray-500 transition-all duration-300 cursor-pointer">
                <div className={isExpanded ? "" : "mx-auto"}>{item.icon}</div>
                <h3 className={isExpanded ? "" : "hidden"}>{item.name}</h3>
              </div>
            </Link>
          ))}
              <div>
              <div onClick={handleLogout} className="flex gap-4 text-white py-3 px-6 rounded-lg mt-5 hover:bg-gray-500 transition-all duration-300 cursor-pointer">
                <div className={isExpanded ? "" : "mx-auto"}><LogoutIcon /></div>
                <h3 className={isExpanded ? "" : "hidden"}>Logout</h3>
              </div>
            </div>
        </nav>
      </div>
    </section>
  );
};

export default InstructorSideNav;
