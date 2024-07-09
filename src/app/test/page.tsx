import Foooter from "@/components/common/Foooter";
import NavBar from "@/components/common/NavBar";
import { Card } from "@/components/ui/card";
import React from "react";

const page = () => {
  return (
    <div>
      <NavBar />
      <div className="w-[80%] mx-auto flex h-[80vh]   ">
        <Card className="flex-[1] bg-base-200 skeleton h-full"></Card>
        <div className="flex-[3] ml-7  gap-5 flex flex-col">
          <Card className=" h-20 bg-base-200 skeleton"></Card>

          <Card className=" h-40 bg-base-200 skeleton"></Card>
          <Card className=" h-40 bg-base-200 skeleton"></Card>
        </div>
      </div>
      <Foooter />
    </div>
  );
};

export default page;
