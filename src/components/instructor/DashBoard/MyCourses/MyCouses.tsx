"use client";
import { ContainerFuild } from "@/styles/layouts/Wrappers";
import React from "react";
import CourseCard from "./CourseCard";
import InstructorDashboard from "../AnalaysePortion/InstructorBoard";
import { useQuery } from "@tanstack/react-query";
import { getInstructorTrendCourse } from "@/helpers/course/courseApiHelper";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import { TOBE } from "@/types/constants/Tobe";

const MyCouses = () => {
  const user = useUserStore((state) => state.user);
  const allCorses = new Array(4).fill(".");
  const { data: tredingCourse } = useQuery({
    queryFn: () => getInstructorTrendCourse(user?._id),
    queryKey: ["trendingCourse"],
  });

  return (
    <div className="pt-10">
      <InstructorDashboard />
      <div className="flex flex-col gap-4 w-[85%] mx-auto mb-10">
        <h3 className="text-2xl font-semibold mt-10">Trending Courses</h3>
        <div className="w-full flex flex-wrap gap-7">
          {tredingCourse?.payload?.map((item: TOBE, i: number) => (
            <CourseCard key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCouses;
