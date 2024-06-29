import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const DailyTask = () => {
  return (
    <div className="w-[90%] mx-auto mt-8 mb-10">
      <h3 className="text-2xl  mb-10 text-gray-700 font-semibold  ">Daily Challanges</h3>
      <div className="w-full flex gap-5">
        <Card className="w-[45%] h-64">
          <CardContent className="w-[100%] mx-auto mt-4">
            <img src="/Daily.png" alt="" />
            <button className="mt-4 text-white bg-[#20B486] px-7 py-[6px]  ">
              Start
            </button>
          </CardContent>
        </Card>
        <Card className="w-[45%] h-64">
          <CardContent className="w-[100%] mx-auto mt-4">
            <img src="/Daily.png" alt="" />
            <button className="mt-4 text-white bg-[#20B486] px-7 py-[6px]  ">
              Start
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DailyTask;
