import { ContainerFuild } from "@/styles/layouts/Wrappers";
import React from "react";
import AboutCard from "./AboutCard";

const AboutSection = () => {
  return (
    <ContainerFuild>
      <section data-aos="fade-up" className="w-full flex flex-col ">
        <div className="title ">
          <h3 className="font-primary text-gray-600 text-center font-semibold text-3xl">
            Learn More About Us
          </h3>
        </div>
        <div className="cardWrapper w-full flex gap-7 h-full flex-wrap items-center  justify-center">
          <AboutCard />
          <AboutCard />
          <AboutCard  className="hidden md:block"/>
        </div>
      </section>
    </ContainerFuild>
  );
};

export default AboutSection;
