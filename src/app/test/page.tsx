import Foooter from "@/components/common/Foooter";
import NavBar from "@/components/common/NavBar";
import { Card } from "@/components/ui/card";
import React from "react";

const page = () => {
  return (
    <div>
      <NavBar />
      <div className="w-[80%] mx-auto flex flex-col h-[80vh]">
        <Card className="bg-base-200 w-full h-40 mb-6 skeleton"></Card>

        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-1/3 h-40 bg-base-200 skeleton"></div>
            <div className="w-2/3 h-40 bg-base-200 skeleton flex flex-col justify-center gap-2 p-4">
              <div className="w-1/2 h-4 bg-gray-300 skeleton"></div>
              <div className="w-3/4 h-4 bg-gray-300 skeleton"></div>
              <div className="w-1/3 h-4 bg-gray-300 skeleton"></div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-2/3 h-40 bg-base-200 skeleton flex flex-col justify-center gap-2 p-4">
              <div className="w-1/2 h-4 bg-gray-300 skeleton"></div>
              <div className="w-3/4 h-4 bg-gray-300 skeleton"></div>
              <div className="w-1/3 h-4 bg-gray-300 skeleton"></div>
            </div>
            <div className="w-1/3 h-40 bg-base-200 skeleton"></div>
          </div>
        </div>

        <div className="w-full h-40 bg-base-200 skeleton mb-6"></div>

        <div className="flex gap-4">
          <div className="w-1/3 h-40 bg-base-200 skeleton"></div>
          <div className="w-1/3 h-40 bg-base-200 skeleton"></div>
          <div className="w-1/3 h-40 bg-base-200 skeleton"></div>
        </div>
      </div>
      <Foooter />
    </div>
  );
};

export default page;
