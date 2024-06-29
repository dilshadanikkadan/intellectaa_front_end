import React from "react";
import CouserCards from "./CouserCards";

const TopCourses = () => {
  return (
    <div className="w-[90%] mx-auto flex   flex-col gap-4 mt-10 ">
      <h3 className="text-2xl font-primary">Top Coursers</h3>
      <div className="w-full flex gap-4 flex-wrap">
        <CouserCards />
        <CouserCards />
        <CouserCards />
        <CouserCards />

        
      </div>
    </div>
  );
};

export default TopCourses;
