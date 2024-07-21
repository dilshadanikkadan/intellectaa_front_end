"use client";
import { Card } from "@/components/ui/card";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from "next/image";
import { getInstroctorCourseHelper } from "@/helpers/course/courseApiHelper";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { TOBE } from "@/types/constants/Tobe";

const IntructorCourse = () => {
  const { id } = useParams();
  const { data: InstructorCourse } = useQuery({
    queryKey: ["myCourse", id],
    queryFn: getInstroctorCourseHelper,
  });

  return (
    <div className="w-[90%] mx-auto relative">
      <h3 className="font-semibold text-2xl mb-4">courses</h3>
      {InstructorCourse?.payload.length > 0 ? (
        <div className="flex flex-wrap">
          {InstructorCourse?.payload?.map((course: TOBE) => (
            <Card
              className={`w-full md:w-[23%] overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 `}
            >
              <div className="relative w-full pb-[56.25%]">
                {" "}
                <Image
                  alt={course?.title}
                  src={course?.thumbnail}
                  fill
                  className="object-cover overflow-hidden hover:scale-105 transition-all duration-500"
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 line-clamp-1">
                  {course?.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {course?.description}
                </p>
                <button className="flex items-center text-[#20B486] hover:text-[#1a9370] transition-colors duration-300">
                  Learn Now
                  <ArrowForwardIcon
                    className="ml-1 hover:translate-x-10 transition-all duration-1000"
                    fontSize="small"
                  />
                </button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="w-full h-fw-full flex items-center justify-center">
          <p className="text-3xl font-semibold text-gray-400">
            No Couses Available
          </p>
        </div>
      )}
    </div>
  );
};

export default IntructorCourse;
