"use client";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import { useRouter } from "next/navigation";
import React from "react";

const ApplicationButton = () => {
  const router = useRouter();
  const isAuthenticated = useUserStore(state=> state.isAuthenticated)
  return (
    <>
    
      <button
        onClick={() => {
          if(isAuthenticated){
            router.push("/teachus/application")
          }else{
            router.push("/login")
          }
        }}
        className=" text-white bg-[#20B486] px-7 py-[6px] mt-10 rounded-md hover:bg-[#17a072] "
      >
        Apply Now
      </button>
    </>
  );
};

export default ApplicationButton;
