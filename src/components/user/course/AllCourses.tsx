import { ContainerFuild } from "@/styles/layouts/Wrappers";
import React from "react";
import CourseCard from "./CourseCard";

const AllCourses = () => {
  const allCorses = new Array(8).fill(".")
  return (
    <div className="mt-10">
      <ContainerFuild>
        <div className="w-full flex flex-wrap gap-7">
          {allCorses?.map((item) => (
            <CourseCard />
          ))}
        </div>
      </ContainerFuild>
    </div>
  );
};

export default AllCourses;
