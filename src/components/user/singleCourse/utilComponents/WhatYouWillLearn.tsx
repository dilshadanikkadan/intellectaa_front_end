import { Card } from "@/components/ui/card";
import React from "react";
import DoneIcon from "@mui/icons-material/Done";
const WhatYouWillLearn = () => {
  return (
    <Card className="w-full md:w-[90%] mx-auto py-5 mt-5">
      <div className="wrapper w-[90%] mx-auto ">
        <h3 className="text-lg  font-semibold ">What You will learn</h3>
        <div className="wrapperP w-full flex flex-col gap-4">
          <p>
            <DoneIcon className="m2-3 text-[#20B486]" /> Work with one of the
            most in-demand web development programming languages
          </p>
          <p>
            <DoneIcon className="m2-3 text-[#20B486]" /> Work with one of the
            most in-demand web development programming languages
          </p>
          <p>
            <DoneIcon className="m2-3 text-[#20B486]" /> Work with one of the
            most in-demand web development programming languages
          </p>
        </div>
      </div>
    </Card>
  );
};

export default WhatYouWillLearn;
