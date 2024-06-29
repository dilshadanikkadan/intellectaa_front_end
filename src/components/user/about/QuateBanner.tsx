import { ContainerFuild } from "@/styles/layouts/Wrappers";
import React from "react";

const QuateBanner = () => {
  return (
    <div className="flex  mt-20">
      <ContainerFuild>
        <div className="bg-[#F0FAF7] h-[60vh]">
          <p className="mt-20 text-4xl font-medium text-center w-[80%] mx-auto">
            Courses was fantastic! It is Master platform for those looking to
            start a new career, or need a refresher.
          </p>
          <div className="wfull mt-16 w-[80%] flex items-center flex-col gap-5 mx-auto  ">
            <img src="/child.jpg" className="w-16 h-16 object-cover rounded-full"  alt="" />
            <p>Muhammed Dilshad A</p>
          </div>
        </div>
      </ContainerFuild>
    </div>
  );
};

export default QuateBanner;
