"use client";
import { logoutHelper } from "@/helpers/api/auth/authApiHelper";
import { User, useUserStore } from "@/store/storeProviders/UseUserStore";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { ModeToggle } from "./DarkModeBtn";
import { FaRegUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SignupButton = () => {
  const {
    loginSuccess,
    logoutSuccess,
    isAuthenticated,
    setIsAuthMode,
    googleAuthSucess,
    user,
  } = useUserStore();
  const router = useRouter();
const currentUser = useUserStore(state=> state.user)
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
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <div className="flex gap-5 items-center">
      {!user ? (
        <>
          <button
          onClick={() => router.push("/signup")}
          className="text-white bg-[#20B486] px-7 py-[6px]"
          >
          Sign Up
        </button>
  
        </>
      ) : (
        <>
     
               <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FaRegUser className="text-[1.3rem]" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{currentUser?.username}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
          <CiLogout onClick={() => logoutMutate()} className="text-[1.3rem]" />
              </TooltipTrigger>
              <TooltipContent>
                <p  >Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      )}
      {/* <div className="ml-10%">
        <ModeToggle />
      </div> */}
    </div>
  );
};

export default SignupButton;
