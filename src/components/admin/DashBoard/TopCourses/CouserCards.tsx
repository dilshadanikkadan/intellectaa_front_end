import React from "react";

const CouserCards = () => {
  return (
    <div className="w-[22%] h-72  rounded-md border border-gray-300 pb-3 ">
      <img src="/course.png" className="h-[60%] object-cover w-[90%] mx-auto mt-3" alt="" />
      <p className="font-semibold ml-3 text-noraml mt-3">
        Python Tutorial For Begginers
      </p>
      <button className="px-5 py-2 bg-black text-white mt-3 ml-3 rounded-md">
        {" "}
        Details
      </button>
    </div>
  );
};

export default CouserCards;
