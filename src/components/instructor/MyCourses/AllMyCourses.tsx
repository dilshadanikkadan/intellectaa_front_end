"use client";
import React from "react";
import CourseCard from "./CourseCard";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteCourseHelper,
  getInstroctorCourseHelper,
} from "@/helpers/course/courseApiHelper";
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
import { TOBE } from "@/types/constants/Tobe";
const AllMyCourses = () => {
  const user = useUserStore((state) => state.user);
  const allCorses = new Array(4).fill(".");
  const router = useRouter();
  const { data: myCourse } = useQuery({
    queryKey: ["myCourse", user?._id],
    queryFn: getInstroctorCourseHelper,
  });

  console.log("_________(((((((())))))))))", myCourse?.payload);

  const queryCleint = useQueryClient();

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteCourseHelper,
    onSuccess: (data) => {
      queryCleint.invalidateQueries(["myCourse"] as TOBE);
    },
  });

  const handleDelete = (courseId: string) => {
    deleteMutate({
      id: courseId,
    });
  };
  return (
    <div className="w-[90%] mx-auto   relative">
      <div className="flex justify-between mb-3">
        <h3 className="text-lg font-semibold mb-3">My Courses</h3>
        <button
          className="px-4 py-2 rounded-md text-gray-800 border border-gray-800"
          onClick={() => router.push("/instructor/myCourses/addCourse")}
        >
          Add Course
        </button>
      </div>
      <Table className="relative z-0 ">
        <TableCaption>A list Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Thumbnail</TableHead>
            <TableHead className="">Title</TableHead>
            <TableHead className="hidden ">Language</TableHead>
            <TableHead className="hidden md:block">Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {myCourse?.payload.map((course: TOBE) => (
            <TableRow key={course?.tilte} className="shadow-sm">
              <TableCell className="font-medium">
                <img
                  src={course.thumbnail}
                  className="w-14 h-w-14  object-cover"
                  alt=""
                />
              </TableCell>
              <TableCell className="font-medium ">{course?.title}</TableCell>
              <TableCell className="hidden ">
                {course?.language}
              </TableCell>
              <TableCell className="hidden md:block">
                {course?.category}
              </TableCell>
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
                {course?.isPublished ? (
                  <Link
                    href={`/instructor/myCourses/${course._id}`}
                    className="py-2 px-5 rounded-md bg-gray-800 text-white text-sm"
                  >
                    Edit
                  </Link>
                ) : (
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="py-2 px-5 rounded-md bg-gray-800 text-white text-sm"
                  >
                    Delete
                  </button>
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
