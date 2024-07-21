"use client";
import { getAllCourseHelper } from "@/helpers/course/courseApiHelper";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { CoursePagination } from "./CoursePagination";
import { TOBE } from "@/types/constants/Tobe";
const CoursesPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const limit = 4;
  const { data: allCourses, isLoading } = useQuery({
    queryFn: () => getAllCourseHelper(pageNumber, limit),
    queryKey: ["allCourses", pageNumber, limit],
  });

  const totalPages = Math.ceil((allCourses?.totalCount || 0) / limit);

  if (isLoading) return <div>loading...........</div>;
  return (
    <div className="w-[90%] mx-auto  relative">
      <Table className="relative z-0">
        <TableCaption>A list Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Thumbnail</TableHead>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Language</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allCourses?.payload?.map((course: TOBE) => (
            <TableRow key={course?.tilte} className="shadow-sm">
              <TableCell className="font-medium">
                <img
                  src={course.thumbnail}
                  className="w-14 h-w-14  object-cover"
                  alt=""
                />
              </TableCell>
              <TableCell className="font-medium ">{course?.title}</TableCell>
              <TableCell>{course?.language}</TableCell>
              <TableCell>{course?.category}</TableCell>
              <TableCell>
                {String(
                  course?.isRejected
                    ? "Rejected"
                    : course?.isPublished
                    ? "Published"
                    : "Not Yet"
                )}
              </TableCell>
              <TableCell className="text-right">
                <Link
                  href={`/admin/courses/${course._id}`}
                  className="py-2 px-5 rounded-md bg-gray-800 text-white text-sm"
                >
                  View Details
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CoursePagination
        setPageNumber={setPageNumber}
        currentPage={pageNumber}
        totalPages={totalPages}
      />
    </div>
  );
};

export default CoursesPage;
