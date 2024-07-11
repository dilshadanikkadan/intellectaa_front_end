"use client";
import { logoutHelper } from "@/helpers/api/auth/authApiHelper";
import { User, useUserStore } from "@/store/storeProviders/UseUserStore";
import { useMutation } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { ModeToggle } from "./DarkModeBtn";

const SignupButton = () => {
  const { data: session, status } = useSession();
  const { loginSuccess, logoutSuccess, isAuthenticated ,setIsAuthMode,googleAuthSucess,user} = useUserStore();
  const router = useRouter();

  const { mutate: logoutMutate, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutHelper,
    onSuccess: async (data) => {
      if (data?.success) {
        console.log("Logout successful");
        await handleLogout();
      }
    },
    onError: (error) => {
      console.error("Logout failed", error);
    }
  });

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      setIsAuthMode()
      googleAuthSucess(session.user as User);
    }
    else if (status === "unauthenticated" && session) {
      logoutSuccess();
   }
  }, [status, session, googleAuthSucess]);

  const handleLogout = async () => {
    logoutSuccess(); 
    await signOut({ redirect: false }); 
    router.push("/"); 
  };

  return (
    <div className="flex gap-5"> 
      {!user ? (
        <button
          onClick={() => router.push("/signup")}
          className="text-white bg-[#20B486] px-7 py-[6px]"
        >
          Sign Up
        </button>
      ) : (
        <button
          onClick={() => logoutMutate()}
          disabled={isLoggingOut}
          className="text-white bg-[#20B486] px-7 py-[6px]"
        >
          {isLoggingOut ? 'Logout' : 'Logout'}
        </button>
      )}
      <div className="ml-10%">
        <ModeToggle />
      </div>
    </div>
  );
};

export default SignupButton;