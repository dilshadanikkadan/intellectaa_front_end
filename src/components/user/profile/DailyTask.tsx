"uce client";
import { Card, CardContent } from "@/components/ui/card";
import { getTodaysTasksHelper } from "@/helpers/course/courseApiHelper";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

const DailyTask = () => {
  const { data: dailyTask, isLoading } = useQuery({
    queryFn: getTodaysTasksHelper,
    queryKey: ["dailyTask"],
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
              <button
                onClick={() => router.push(`/problems/${problem}`)}
                className="mt-2 text-white bg-[#20B486] px-7 py-[6px]  "
              >
                Start
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DailyTask;
