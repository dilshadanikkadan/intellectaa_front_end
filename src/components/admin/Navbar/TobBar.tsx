"use client";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import { useRouter } from "next/navigation";
import React from "react";
const TopBar = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  return (
    <div className="wrapper flex h-[10vh] md:h-[15vh]  w-[90%] md:w-[90%]  md:mx-auto    items-center">
      <div className="center flex-[2] flex gap-6 text-[1.2rem]  font-primary text-gray-600"></div>
      <div className="right flex-[1] flex justify-end text-[1.1rem]  font-primary">
        {user?.isInstructor ? (
          <button
            onClick={() => router.push("/")}
            className=" text-white bg-gray-900 text-sm px-4 md:px-7 py-1  md:py-[6px]  "
          >
            Back To Home
          </button>
        ) : (
          <button className=" text-white bg-gray-900 px-7 py-[6px]  ">
            Admin Panel
          </button>
        )}
      </div>
    </div>
  );
};

export default TopBar;
