import { ContainerFuild } from "@/styles/layouts/Wrappers";
import React from "react";

const OneToOne = () => {
  return (
    <div className="mt-36" data-aos="fade-up">
      <ContainerFuild>
        <div className="w-full flex flex-col md:flex-row">

        <div className="left flex-[1]">
          <img src="/OneToOne.png" alt="oneToOne" />
        </div>
        <div className="right flex-[1] flex justify-center flex-col gap-7 ml-10  ">
          <h3 className="text-2xl font-semibold text-primary"><span className="text-[#2F327D]">One-on-One</span> Discussions</h3>
          <p>
            Teachers and teacher assistants can talk with students privately
            without leaving the Zoom environment. Teachers and teacher
            assistants can talk with students privately without leaving the Zoom
            environment.
          </p>
        </div>
        </div>

      </ContainerFuild>
    </div>
  );
};

export default OneToOne;
