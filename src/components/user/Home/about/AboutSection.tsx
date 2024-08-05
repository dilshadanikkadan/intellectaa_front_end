import { ContainerFuild } from "@/styles/layouts/Wrappers";
import React from "react";
import { SupportAgent, Code, School } from "@mui/icons-material";
import { aboutData } from "@/types/constants/about";
import AboutCard from "./AboutCard";

const AboutSection = () => {
  return (
    <ContainerFuild>
      <section data-aos="fade-up" className="w-full flex flex-col ">
        <div className="title ">
          <h3 className=" text-gray-600 text-center font-semibold text-3xl">
            Learn More About Us
          </h3>
        </div>
        <div className="cardWrapper w-full flex gap-7 h-full flex-wrap items-center justify-center">
          {aboutData.map((item, index) => (
            <AboutCard
              key={index}
              title={item.title}
              description={item.description}
              Icon={item.Icon}
              className={index === 2 ? "hidden md:block" : ""}
            />
          ))}
        </div>
      </section>
    </ContainerFuild>
  );
};

export default AboutSection;
