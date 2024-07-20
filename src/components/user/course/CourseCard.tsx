"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from "next/image";

interface Props {
  className?: string;
  course: any;
  i: any;
}

const CourseCard = ({ className, course, i }: Props) => {
  return (
    <Card
      data-aos="fade-up"
      data-aos-duration="800"
      data-aos-delay={`${i+1}00`}
      className={`w-full md:w-[23%] overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}
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
          {course?.description ||
            "Welcome to our comprehensive programming tutorial..."}
        </p>
        <Link href={`/courses/${course._id}`}>
          <button className="flex items-center text-[#20B486] hover:text-[#1a9370] transition-colors duration-300">
            Learn Now
            <ArrowForwardIcon className="ml-1 hover:translate-x-10 transition-all duration-1000" fontSize="small" />
          </button>
        </Link>
      </div>
    </Card>
  );
};

export default CourseCard;
