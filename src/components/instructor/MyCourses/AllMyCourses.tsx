"use client";
import React from "react";
import CourseCard from "./CourseCard";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getInstroctorCourseHelper } from "@/helpers/course/courseApiHelper";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
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
const AllMyCourses = () => {
  const user = useUserStore((state) => state.user);
  const allCorses = new Array(4).fill(".");
  const router = useRouter();
  const { data: myCourse } = useQuery({
    queryKey: ["myCourse", user?._id],
    queryFn: getInstroctorCourseHelper,
  });
  return (
 
    <div className="w-[90%] mx-auto  relative">
      <h3 className="text-lg font-semibold mb-3">My Courses</h3>
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
          {myCourse?.payload.map((course: any) => (
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
                {String( course?.isRejected ? "Rejected" :course?.isPublished ? "Published" : "Not Yet")}
              </TableCell>
              <TableCell className="text-right">
                {
   
                course?.isPublished ? (
                  <Link
                    href={`/instructor/myCourses/${course._id}`}
                    className="py-2 px-5 rounded-md bg-gray-800 text-white text-sm"
                  >
                    Edit
                  </Link>
                ) : (
                  <Link
                    href={``}
                    className="py-2 px-5 rounded-md bg-gray-800 text-white text-sm"
                  >
                   Delete
                  </Link>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllMyCourses;
