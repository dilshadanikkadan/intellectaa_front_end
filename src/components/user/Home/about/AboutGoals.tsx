import { GoalWrapper } from "@/styles/layouts/Wrappers";
import React from "react";
import AboutCard from "./AboutCard";
import { aboutData } from "@/types/constants/about";

const AboutGoals = () => {
  return (
    <div data-aos="fade-up" className="mt-10 hidden md:block">
      <GoalWrapper>
        <div className="w-[80%] mx-auto mt-5 dark:bg-gray-900 dark:shadow-2xl bg-[#F0FAF7] ">
          <div className="title mt-10">
            <h3 className="font-primary text-gray-600 text-center font-semibold text-2xl">
              Learn More About Our Goals
            </h3>
          </div>
          <div className="cardWrapper flex flex-wrap  gap-7 h-full  items-center  justify-center">
            {aboutData.map((item, index) => (
              <AboutCard
                key={index}
                title={item.title}
                description={item.description}
                Icon={item.Icon}
                className={index === 1 ? "relative top-14" : ""}
              />
            ))}
          </div>
        </div>
      </GoalWrapper>
    </div>
  );
};

export default AboutGoals;
