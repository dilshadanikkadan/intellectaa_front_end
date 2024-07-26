import { ContainerFuild } from "@/styles/layouts/Wrappers";
import React from "react";

const WhyUs = () => {
  return (
    <div className="mt-36">
      <ContainerFuild>
        <div className="flex flex-col gap-10 ">
          <h3 className="text-3xl md:text-5xl font-semibold ">
            Why Choose Us ?
          </h3>
          <div data-aos="fade-up">
            <span className="text-3xl md:text-5xl font-semibold  text-[#20B486] ">
              Accelerate innovation
            </span>
            <h3 className="text-2xl md:text-5xl ">
              Our productivity suite is designed to help you stay organized,
              manage your time effectively
            </h3>
          </div>
          <div className="relative">
            <div className="w-full h-[70vh] rounded-xl bg-gray-900">
              <h3 className="text-2xl md:text-3xl font-semibold text-base-300 ml-[7%] w-[90%]  md:w-[60%] pt-10">
                Empower developers With Intellectaa, you can secure code in
                minutes.
              </h3>

              <div className="wrapper flex flex-wrap flex-col md:flex-row w-[80%] mx-auto mt-10 gap-5">
                <div className="card w-[45%] flex   justify-center gap-2 h-[4rem] bg-gray-900 rounded-md"></div>
                <div
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="card w-[100%] md:mt-3 md:w-[45%] flex   justify-center gap-2 h-[4rem] bg-[#41474E] rounded-md"
                >
                  <div className="flex ml-5">
                    <img
                      src="/tick.png"
                      className="h-6 w-6  object-cover"
                      alt=""
                    />
                    <p className="text-lg ml-5">
                      {" "}
                      Train Your Self And Make Proud
                    </p>
                  </div>
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-delay="200"
                  className="card w-[100%] md:mt-3 md:w-[45%]   justify-center gap-2 h-[4rem] bg-[#41474E] rounded-md"
                >
                  <div className="flex ml-5">
                    <img
                      src="/tick.png"
                      className="h-6 w-6  object-cover"
                      alt=""
                    />
                    <p className="text-lg ml-5"> Break The Tutorial Hell</p>
                  </div>
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-delay="300"
                  className="card w-[100%] md:mt-3 md:w-[45%] flex  justify-center gap-2 h-[4rem] bg-[#41474E] rounded-md"
                >
                  <div className="flex ml-5">
                    <img
                      src="/tick.png"
                      className="h-6 w-6  object-cover"
                      alt=""
                    />
                    <p className="text-lg ml-5"> Make New Eduction System</p>
                  </div>
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-delay="400"
                  className="card w-[100%] md:mt-3 md:w-[45%] hidden md:flex   justify-center gap-2 h-[4rem] bg-gray-900 rounded-md"
                ></div>
                <div
                  data-aos="fade-up"
                  data-aos-delay="500"
                  className="card hidden w-[100%] md:mt-3 md:w-[45%] md:flex   justify-center gap-2 h-[4rem] bg-[#41474E] rounded-md"
                >
                  <div className="flex ml-5">
                    <img
                      src="/tick.png"
                      className="h-6 w-6  object-cover"
                      alt=""
                    />
                    <p className="text-lg ml-5"> Build New World</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContainerFuild>
    </div>
  );
};

export default WhyUs;
