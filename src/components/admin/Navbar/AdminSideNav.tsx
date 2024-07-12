  "use client"
import React, { useState } from "react";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const AdminSideNav = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    { icon: <HomeIcon />, name: "Dashboard", href: "/admin" },
    { icon: <PeopleIcon />, name: "Users", href: "/admin/users" },
    { icon: <PeopleIcon />, name: "Courses", href: "/admin/courses" },
    { icon: <PeopleIcon />, name: "Tasks", href: "/admin/tasks" },
    { icon: <SettingsIcon />, name: "Settings", href: "/admin/settings" },
    { icon: <LogoutIcon />, name: "Logout", href: "/logout" },
  ];

  return (
    <section
      className={`fixed top-0 left-0 h-[100vh] bg-[#2D2F31]  transition-all duration-300 z-50
        ${isExpanded ? "w-[22%]" : "w-[5%]"}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className={`wrapper ${isExpanded ? "w-[80%]" : "w-[100%]"} mx-auto pt-10 font-semibold`}>
        <h3 className={`text-2xl text-white ${isExpanded ? "" : "text-center"}`}>
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
        </nav>
      </div>
    </section>
  );
};

export default AdminSideNav;