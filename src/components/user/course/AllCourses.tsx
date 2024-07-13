"use client";
import { ContainerFuild } from "@/styles/layouts/Wrappers";
import React, { useState } from "react";
import CourseCard from "./CourseCard";
import {  useQuery } from "@tanstack/react-query";
import { getAllPublishCoursesHelper } from "@/helpers/course/courseApiHelper";
import CourseBreadC from "./CourseBreadC";

const AllCourses = () => {
  const [searchTerm, setSearchTerm] = useState<any>("");

  const { data: allCourses } = useQuery({
    queryFn: getAllPublishCoursesHelper,
    queryKey: ["allPublishedCourses"],
  });

  const filteredCourses = allCourses?.payload?.filter((course:any) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (term:any) => {
    setSearchTerm(term);
  };



  return (
    <div className="">
      <CourseBreadC onSearch={handleSearch} />
      <div className="mt-10">
        <ContainerFuild>
          <div className="w-full flex flex-wrap gap-7">
            {filteredCourses?.map((item:any) => (
              <CourseCard key={item.id} course={item} />
            ))}
          </div>
        </ContainerFuild>
      </div>
    </div>
  );
};

export default AllCourses;