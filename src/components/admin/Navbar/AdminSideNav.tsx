"use client";
import React, { useState } from "react";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import { useMutation } from "@tanstack/react-query";
import { logoutHelper } from "@/helpers/api/auth/authApiHelper";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import { useRouter } from "next/router";
const AdminSideNav = () => {
  const router = useRouter();
  const {
    logoutSuccess,
  
  } = useUserStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const { mutate: logoutMutate, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutHelper,
    onSuccess: async (data) => {
      if (data?.success) {
        console.log("Logout successful");
        await handleLogout();
        router.push("/");
      }
    },
    onError: (error) => {
      console.error("Logout failed", error);
    },
  });
  const handleLogout = async () => {
    logoutSuccess();
    router.push("/");
  };
  const navItems = [
    { icon: <DashboardIcon />, name: "Dashboard", href: "/admin" },
    { icon: <PeopleIcon />, name: "Users", href: "/admin/users" },
    { icon: <LaptopChromebookIcon />, name: "Courses", href: "/admin/courses" },
    { icon: <AssignmentIcon />, name: "Tasks", href: "/admin/tasks" },
    { icon: <PersonAddAltIcon />, name: "Instructors", href: "/admin/instructor" },
    { icon: <CategoryIcon />, name: "Category", href: "/admin/category" },
    // { icon: <LogoutIcon />, name: "Logout", href: "/logout" },
  ];

  return (
    <section
      className={`fixed top-0 left-0 h-[100vh] bg-[#2D2F31]  transition-all duration-300 z-50
        ${isExpanded ? "w-[22%]" : "w-[5%]"}`}
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
          {isExpanded ? "Admin" : "A"}
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

export default AdminSideNav;
