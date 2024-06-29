"use client"
import React from "react";
import CourseCard from "./CourseCard";
import { useRouter } from "next/navigation";

const AllMyCourses = () => {
  const allCorses = new Array(4).fill(".");
  const  router = useRouter()
  return (
    <div className="mt-10">
      <div className="flex flex-col gap-4 w-[85%] mx-auto">
        <div className="flex justify-between">
          <h3 className="text-2xl">My Courses</h3>
        
          <button onClick={()=> router.push('/instructor/myCourses/addCourse')} className="text-gray-800 border border-gray-800 px-7 py-[6px] mr-16">
            Add Courses
          </button>
        </div>
        <div className="w-full flex flex-wrap gap-7">
          {allCorses?.map((item) => (
            <CourseCard />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMyCourses;
