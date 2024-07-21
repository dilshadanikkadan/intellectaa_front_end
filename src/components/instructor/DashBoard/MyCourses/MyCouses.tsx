
import { ContainerFuild } from "@/styles/layouts/Wrappers";
import React from "react";
import CourseCard from "./CourseCard";
import InstructorDashboard from "../AnalaysePortion/InstructorBoard";

const MyCouses = () => {
  const allCorses = new Array(4).fill(".")


  return (
    <div className="mt-10">
      <InstructorDashboard />
      <div className="flex flex-col gap-4 w-[85%] mx-auto">
        <h3 className="text-2xl">Trending Courses</h3>
        <div className="w-full flex flex-wrap gap-7">
          {allCorses?.map((item,i) => (
            <CourseCard key={i}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCouses;
