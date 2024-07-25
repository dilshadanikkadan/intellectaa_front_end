"use client";

import { getMySubmittedQuestionHelper } from "@/helpers/course/courseApiHelper";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import { TOBE } from "@/types/constants/Tobe";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const SubmissionMine = () => {
  const user = useUserStore((state) => state.user);
  const {
    data: mySubmission,

    error,
  } = useQuery({
    queryKey: ["mySubmission", user?._id],
    queryFn: getMySubmittedQuestionHelper,
  });

  console.log("______________^^^^^^^^^", mySubmission?.payload);

  return (
    <section className="w-[95%]  mx-auto mt-5">
      {mySubmission?.payload.map((problem: TOBE, i: number) => (
        <div
          key={i}
          className={`w-full h-10 ${
            i % 2 === 0 ? "bg-[#F7F7F8]" : "bg-white"
          } rounded-md flex items-center pl-4 mt-1 font-semibold`}
        >
          {problem?.split("_")}
        </div>
      ))}
    </section>
  );
};

export default SubmissionMine;
