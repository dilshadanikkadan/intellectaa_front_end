"use client";
import { useRouter } from "next/navigation";
import React from "react";

const ApplicationButton = () => {
  const router = useRouter();
  return (
    <>
      <button
        onClick={() => router.push("/teachus/application")}
        className=" text-white bg-[#20B486] px-7 py-[6px] mt-10 "
      >
        Apply Now
      </button>
    </>
  );
};

export default ApplicationButton;
