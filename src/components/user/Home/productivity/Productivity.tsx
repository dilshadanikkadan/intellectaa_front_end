import { ContainerFuild } from "@/styles/layouts/Wrappers";
import React from "react";

const Productivity = () => {
  return (
    <div className="mt-32">
      <ContainerFuild>
        <div className="flex flex-col gap-10 ">
          <h3 className="text-3xl md:text-5xl font-semibold  ">Productivity</h3>
          <div data-aos="fade-up">
            <span className="text-3xl md:text-5xl font-semibold  text-[#20B486] ">
              Accelerate innovation
            </span>
            <h3 className="text-2xl md:text-5xl   ">
              Our productivity suite is designed to help you stay organized,
              manage your time effectively
            </h3>
          </div>
          <div className="relative">
            <img
              data-aos="fade-up"
              className="rounded-lg  "
              src="/pro.png"
              
              alt=""
            />
            <img
              data-aos="fade-left"
              className="rounded-lg shadow-white shadow-md   w-[40%] absolute top-[25%] right-[5%]"
              src="/sub.png"
              alt=""
            />
          </div>
        </div>
      </ContainerFuild>
    </div>
  );
};

export default Productivity;
