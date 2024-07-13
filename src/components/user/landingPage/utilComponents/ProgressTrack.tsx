"use client";
import { Card } from "@/components/ui/card";
import { getMyEntrollHelper } from "@/helpers/course/courseApiHelper";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

const ProgressTrack = () => {
  const user = useUserStore((state) => state.user);
  const { data: MyEntroll } = useQuery({
    queryFn: getMyEntrollHelper,
    queryKey: ["myEntroll", user?._id],
  });
  const router = useRouter();
  console.log("____________********&", MyEntroll);

  return (
    <div className="w-[95%] transition-all  duration-700 mx-auto mt-5">
      <h4 className="text-xl font-semibold my-2">My Courses</h4>
      <div className="wfull flex flex-wrap gap-4">
        {MyEntroll?.payload.map((myCorurse: any) => (
          <Card className="w-[26%]   rounded-md border border-gray-300 pb-5 ">
            <img
              src={myCorurse?.courseId?.thumbnail}
              className="h-[45%] object-cover w-[90%] mx-auto mt-3"
              alt=""
            />
            <p className="font-semibold ml-3 text-noraml mt-3">
              {myCorurse?.courseId?.title}
            </p>

            <p className="my-2 w-[90%] mx-auto">
              Lesson Complted {myCorurse?.courseId?.lessons.length}/
              {myCorurse?.progress?.completedLessons?.length}
            </p>
            <button
              onClick={() =>
                router.push(`/courses/${myCorurse?.courseId?._id}`)
              }
              className="px-5 py-2 bg-black text-white mt-3 ml-3 rounded-md"
            >
              {" "}
              Continue
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProgressTrack;
