import React from "react";
import { ContainerFuild } from "@/styles/layouts/Wrappers";
import ServiceCard from "./ServiceCard";

const OurService = () => {
  return (
    <div className="flex mt-20">
      <ContainerFuild >
        <section className="w-[100%] flex flex-col items-center  mx-auto">
          <div className="title text-center">
            <h3 className="text-2xl  font-semibold">our services</h3>
            <p>Fostering a playful & engaging learning environment</p>
          </div>
          <div className="cards w-full  mt-7 flex justify-center flex-wrap gap-10">
            <ServiceCard className="bg-[#4AC8AE] text-white" />
            <ServiceCard  />
            <ServiceCard  />
          </div>
        </section>
      </ContainerFuild>
    </div>
  );
};

export default OurService;
