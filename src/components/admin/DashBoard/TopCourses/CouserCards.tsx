import { Card } from "@/components/ui/card";
import { TOBE } from "@/types/constants/Tobe";
import React from "react";
interface Props {
  course: TOBE;
}
const CouserCards = ({ course }: Props) => {
  return (
    <Card className=" h-72  rounded-md border border-gray-300 pb-3 ">
      <img
        src={course?.coursesData?.thumbnail}
        className="h-[60%] object-cover w-[90%] mx-auto mt-3"
        alt=""
      />
      <p className="font-semibold ml-3 text-noraml mt-3">
        {course?.coursesData?.title}
      </p>
      <div>
        <p className="font-semibold ml-3">
          Enrolled By {course?.enrollmentCount}
        </p>
      </div>
    </Card>
  );
};

export default CouserCards;
