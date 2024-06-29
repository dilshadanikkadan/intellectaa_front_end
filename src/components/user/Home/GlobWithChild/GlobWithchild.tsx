import { ContainerFuild } from "@/styles/layouts/Wrappers";
import Image from "next/image";
import React from "react";

const GlobWithchild = () => {
  return (
    <div className="mt-10">
      <ContainerFuild>
        <div className="flex w-full flex-col gap-10 ">
          <div className="w-full  flex items-center justify-center">
            <img
              data-aos="fade-up"
              src="/childglob.png"
              className="h-full w-[70%] object-cover"
              alt=""
            />
          </div>
        </div>
      </ContainerFuild>
    </div>
  );
};

export default GlobWithchild;
