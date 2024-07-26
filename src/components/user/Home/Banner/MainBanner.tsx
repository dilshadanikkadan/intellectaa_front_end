import Button from "@/styles/ui/Button";
import React from "react";

const MainBanner = () => {
  return (
    <section
      data-aos="fade-up"
      className="w-[90%] mx-auto mt-7  relative  bg-gradient-to-r h-screen md:h-auto  flex  "
    >
      <img
        className="w-40 absolute top-0 z-[-999] left-0 h-36 object-cover"
        src="pattern.png"
        alt="pattern"
      />
      <div className="main w-[88%] mx-auto flex flex-col md:flex-row h-[75vh] mt-7 z-50">
        <div className="left flex-[1]   flex flex-col  gap-14 ">
          <h3 className="text-5xl text-primary font-semibold">
            <span className="text-[#F48C06] font-semibold">Learn</span> From
            online Feels like Real Class
          </h3>
          <p className=" font-normal">
            Our “Learn from Online Feels Like Real Class” feature brings the
            classroom experience to your screen with unmatched authenticity and
            interactivity. Designed to bridge the gap between virtual and
            physical learning environments, this feature combines cutting-edge
            technology with engaging content to create a classroom experience
            that feels both immersive and effective.
          </p>
          <div className=" flex gap-9">
            <Button
              className="bg-[#20B486] text-white px-7 py-3  rounded-md"
              value="Join Now"
            />
            <Button
              value="Play Video"
              className="bg-[#D4D1FA] text-gray-700 px-7 py-3  rounded-md"
            />
          </div>
        </div>

        <div className="right flex-[1] flex  justify-center ">
          <img
            className="h-[90%] object-cover  relative top-[-5%]"
            src="/bannerBg.png"
            alt="main"
          />
        </div>
      </div>
    </section>
  );
};

export default MainBanner;
