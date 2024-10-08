"use client";
import { ContainerFuild } from "@/styles/layouts/Wrappers";
import Link from "next/link";
import React from "react";
import { useTypewriter } from "react-simple-typewriter";
const TutorialHell = () => {
  const [typeEffect] = useTypewriter({
    words: [" break tutorial hell", " build new education", " build new world"],
    loop: 99,
    typeSpeed: 100,
    deleteSpeed: 40,
  });
  return (
    <>
      <div className="mt-28 mb-10 wf  ">
        <div className="flex w-[80%] mx-auto ">
          <div className="flex flex-col gap-5 ">
            <h3 className="text-3xl md:text-7xl font-semibold">
              Let’s {typeEffect}
            </h3>
            <div data-aos="fade-up">
              <h3 className="text-xl  text-gray-200  ">
                Our Learning-powered platform increases the pace of software
                development.
              </h3>
            </div>
            <div className="mt-5 flex gap-10">
              <Link target="_blank" href={'https://www.youtube.com/results?search_query=how+e+learning+works'} className=" border hover:bg-white hover:text-black transition-all duration-300 border-white rounded-md py-1.5 px-5 md:px-16 md:py-4  ">
                Make It UnReal
              </Link>
              <Link  href={'/signup'} className=" border hover:bg-white hover:text-black transition-all duration-300 border-white rounded-md py-1.5 px-5 md:px-16 md:py-4  ">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorialHell;
