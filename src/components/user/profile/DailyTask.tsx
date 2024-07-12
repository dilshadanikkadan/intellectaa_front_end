"uce client";
import { Card, CardContent } from "@/components/ui/card";
import { getMySubmissionHelper, getMySubmittedQuestionHelper, getTodaysTasksHelper } from "@/helpers/course/courseApiHelper";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DailyTask = () => {
  const user = useUserStore(state=> state.user)
  const { data: dailyTask, isLoading } = useQuery({
    queryFn: getTodaysTasksHelper,
    queryKey: ["dailyTask"],
  });

  const {
    data: mySubmission,
    
    error,
  } = useQuery({
    queryKey: ["mySubmission", user?._id],
    queryFn: getMySubmittedQuestionHelper,
  });


  const router = useRouter();
  return (
    <div className="w-[90%] mx-auto mt-8 mb-10">
      <h3 className="text-2xl  mb-10 text-gray-700 font-semibold  ">
        Daily Challanges
      </h3>
      <div className="w-full flex gap-5">
        {dailyTask?.payload.problems?.map((problem: any, i: any) => (
          <Card className="w-[45%] py-3">
            <CardContent className="w-[100%] mx-auto mt-4">
              <img src="/Daily.png" alt="" />
              <p className="my-2 ">{problem?.split("_").join(" ")}</p>
              {
                mySubmission?.payload.includes(problem)
                ?
                <button
                // onClick={() => router.push(`/problems/${problem}`)}
                className="mt-2 text-white bg-[#20B486] px-7 py-[6px]  "
                >
                Completed
              </button>
                :
                <button
                onClick={() => router.push(`/problems/${problem}`)}
                className="mt-2 text-white bg-[#20B486] px-7 py-[6px]  "
                >
                Start
              </button>
              }
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DailyTask;
