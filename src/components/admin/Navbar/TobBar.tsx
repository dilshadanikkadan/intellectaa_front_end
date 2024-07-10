
import React from "react";
const TopBar = () => {
  return (
    <div className="wrapper flex h-[15vh] w-[100%]   mx-auto items-center">
      <div className="center flex-[2] flex gap-6 text-[1.2rem]  font-primary text-gray-600"></div>
      <div className="right flex-[1] flex justify-center text-[1.1rem]  font-primary">
      <button  
          className=" text-white bg-gray-900 px-7 py-[6px]  "
        >
          Admin Panel
        </button>
      </div>
    </div>
  );
};

export default TopBar;
