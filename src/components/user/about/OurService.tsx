import React from "react";
import { ContainerFuild } from "@/styles/layouts/Wrappers";
import ServiceCard from "./ServiceCard";
import { aboutData } from "@/types/constants/about";

const OurService = () => {
  return (
    <div data-aos="fade-up" className="flex mt-20">
      <ContainerFuild>
        <section className="w-[100%] flex flex-col items-center  mx-auto">
          <div className="title text-center">
            <h3 className="text-2xl  font-semibold">our services</h3>
            <p>Fostering a playful & engaging learning environment</p>
          </div>
          <div className="cards w-full  mt-7 flex justify-center flex-wrap gap-10">
            {aboutData?.map((item, i) => (
              <div className="md:w-[23%]" key={i}>
                <ServiceCard i={i} item={item} className="" />
              </div>
            ))}
          </div>
        </section>
      </ContainerFuild>
    </div>
  );
};

export default OurService;
