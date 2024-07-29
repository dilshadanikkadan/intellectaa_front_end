"use client";
import { ContainerFuild } from "@/styles/layouts/Wrappers";
import React, { useDeferredValue, useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { useQuery } from "@tanstack/react-query";
import { getAllPublishCoursesHelper } from "@/helpers/course/courseApiHelper";
import CourseBreadC from "./CourseBreadC";
import { CoursePagination } from "./utilComponents/CoursePagination";
import { TOBE } from "@/types/constants/Tobe";

const AllCourses = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [pageNumber, setPageNumber] = useState(1);
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState<string>(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const limit = 4;
  const { data: allCourses } = useQuery({
    queryFn: () =>
      getAllPublishCoursesHelper(
        debouncedSearchTerm,
        category,
        pageNumber,
        limit,
        language
      ),
    queryKey: [
      "allPublishedCourses",
      debouncedSearchTerm,
      category,
      pageNumber,
      limit,
      language,
    ],
  });

  const totalPages = Math.ceil((allCourses?.payload.totalCount || 0) / limit);

  console.log("********", category);

  const handleSearch = (term: any) => {
    setSearchTerm(term);
  };

  return (
    <div className="">
      <CourseBreadC
        setLanguage={setLanguage}
        setCategory={setCategory}
        onSearch={handleSearch}
      />
      <div className="mt-10">
        <div className="flex mx-auto w-[80%] flex-col gap-5">
          <div className="w-full flex flex-wrap gap-7">
            {allCourses?.payload?.courses?.map((item: TOBE, i: number) => (
              <CourseCard key={item.id} course={item} i={i} />
            ))}
          </div>
          <CoursePagination
            setPageNumber={setPageNumber}
            currentPage={pageNumber}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
