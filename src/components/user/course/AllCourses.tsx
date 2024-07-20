"use client";
import { ContainerFuild } from "@/styles/layouts/Wrappers";
import React, { useState } from "react";
import CourseCard from "./CourseCard";
import { useQuery } from "@tanstack/react-query";
import { getAllPublishCoursesHelper } from "@/helpers/course/courseApiHelper";
import CourseBreadC from "./CourseBreadC";

const AllCourses = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const { data: allCourses } = useQuery({
    queryFn: () => getAllPublishCoursesHelper(searchTerm,category),
    queryKey: ["allPublishedCourses", searchTerm,category],
  });

  console.log("********", category);

  const handleSearch = (term: any) => {
    setSearchTerm(term);
  };

  return (
    <div className="">
      <CourseBreadC setCategory={setCategory} onSearch={handleSearch} />
      <div className="mt-10">
        <ContainerFuild>
          <div className="w-full flex flex-wrap gap-7">
            {allCourses?.payload?.map((item: any ,i:number) => (
              <CourseCard key={item.id} course={item}  i={i}/>
            ))}
          </div>
        </ContainerFuild>
      </div>
    </div>
  );
};

export default AllCourses;
