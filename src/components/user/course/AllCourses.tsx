"use client"
import { ContainerFuild } from "@/styles/layouts/Wrappers";
import React from "react";
import CourseCard from "./CourseCard";
import { useQuery } from "@tanstack/react-query";
import { getAllPublishCoursesHelper } from "@/helpers/course/courseApiHelper";

const AllCourses = () => {
  const allCorses = new Array(8).fill(".")
  const {data:allCourses}= useQuery({
    queryFn:getAllPublishCoursesHelper,
    queryKey:['allPublishedCoureses']
  })


  return (
    <div className="mt-10">
      <ContainerFuild>
        <div className="w-full flex flex-wrap gap-7">
          {allCourses?.payload?.map((item:any) => (
            <CourseCard course={item} />
          ))}
        </div>
      </ContainerFuild>
    </div>
  );
};

export default AllCourses;
