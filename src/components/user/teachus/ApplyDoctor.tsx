import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ApplicationButton from "@/components/user/teachus/ApplicationButton";

const ApplyDoctor = () => {
  return (
    <div
      data-aos="fade-up"
      className="w-[70%] flex-col md:flex-row flex mx-auto mt-16 mb-10"
    >
      <div className="left flex-[1]">
        <img src="/teacher.png" className="w-[100%] md:w-[70%]" alt="" />
      </div>
      <div className="right flex-[1] mt-7 md:mt-0">
        <div className="flex gap-5 flex-col">
          <h3 className="text-2xl ">Apply As Instructor</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            tempora, eveniet accusantium corporis ab fuga repellendus velit ad,
            aut, distinctio debitis harum blanditiis hic nesciunt nam? Excepturi
            ratione vero beatae.
          </p>
        </div>
        <div className="flex gap-5 flex-col mt-10">
          <h3 className="text-2xl ">Intstructor Requirements</h3>
          <p>
            <ArrowForwardIcon className="text-[#20B486] mr-2" /> Good Knowlegde
          </p>
          <p>
            <ArrowForwardIcon className="text-[#20B486] mr-2" /> better Mind set
          </p>
          <p>
            <ArrowForwardIcon className="text-[#20B486] mr-2" /> Immense Profile
          </p>
        </div>
        <ApplicationButton />
      </div>
    </div>
  );
};

export default ApplyDoctor;
