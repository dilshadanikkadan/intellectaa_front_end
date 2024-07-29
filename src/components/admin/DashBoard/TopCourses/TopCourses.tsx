"use client";
import React from "react";
import CouserCards from "./CouserCards";
import { useQuery } from "@tanstack/react-query";
import { getTrendCoursesHelper } from "@/helpers/course/courseApiHelper";
import { TOBE } from "@/types/constants/Tobe";

const TopCourses = () => {
  const { data: trndingCourses } = useQuery({
    queryKey: ["trending Courses"],
    queryFn: getTrendCoursesHelper,
  });
  return (
    <div className="w-[90%] mx-auto flex   flex-col gap-4 mt-10 mb-10 ">
      <h3 className="text-2xl font-semibold">Top Courses</h3>
      <div className="w-full flex gap-4 flex-wrap">
        {trndingCourses?.payload.map((course: TOBE, i: number) => (
          <div className="flex w-[22%] " key={i}>
            <CouserCards course={course} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCourses;
