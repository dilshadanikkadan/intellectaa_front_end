"use client"
import React from "react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface Props {
  className?: string;
  course: any;
}

const CourseCard = ({ className, course }: Props) => {
  return (
    <Card className={`w-full md:w-[23%] overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <div className="aspect-w-16 aspect-h-9">
        <img 
          src={course?.thumbnail} 
          className="w-full h-full object-cover" 
          alt={course?.title} 
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{course?.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {course?.description || "Welcome to our comprehensive programming tutorial..."}
        </p>
        <Link href={`/courses/${course._id}`}>
          <button className="flex items-center text-[#20B486] hover:text-[#1a9370] transition-colors duration-300">
            Learn Now
            <ArrowForwardIcon className="ml-1" fontSize="small" />
          </button>
        </Link>
      </div>
    </Card>
  );
}

export default CourseCard;