"use client";
import { Card } from "@/components/ui/card";
import { getMyEntrollHelper } from "@/helpers/course/courseApiHelper";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from "next/image";
import { TOBE } from "@/types/constants/Tobe";

const ProgressTrack = () => {
  const user = useUserStore((state) => state.user);
  const { data: MyEntroll, isLoading } = useQuery({
    queryFn: getMyEntrollHelper,
    queryKey: ["myEntroll", user?._id],
  });
  const router = useRouter();
  console.log("____________********&", MyEntroll);
  if (isLoading) {
    return <div>loading.......</div>;
  }
  return (
    <div className="w-[95%]  mx-auto mt-5">
      <h4 className="text-xl font-semibold my-2">My Courses</h4>
      <div className="wfull flex flex-wrap gap-4">
        {MyEntroll?.payload.map((myCorurse: TOBE,i:number) => (
          <Card key={i} className=" w-[40%] md:w-[26%]   rounded-md border border-gray-300 pb-5 ">
            <div className="w-[90%] relative h-28 rounded-md mx-auto">
              <Image
                src={myCorurse?.courseId?.thumbnail}
                className="object-cover  mx-auto mt-3"
                alt=""
                layout="fill"
              />
            </div>
            <p className="font-semibold ml-3 text-noraml mt-3">
              {myCorurse?.courseId?.title}
            </p>

            <p className="my-2 w-[90%] mx-auto">
              Lesson Complted {myCorurse?.courseId?.lessons.length}/
              {myCorurse?.progress?.completedLessons?.length}
            </p>

            <Link href={`/courses/${myCorurse?.courseId?._id}`}>
              <button className="flex items-center ml-3 text-[#20B486] hover:text-[#1a9370] transition-colors duration-300">
                continue
                <ArrowForwardIcon className="ml-1" fontSize="small" />
              </button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProgressTrack;
