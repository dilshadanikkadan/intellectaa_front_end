"use client"
import { Card } from "@/components/ui/card";
import React from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import { useRouter } from "next/navigation";
import { TOBE } from "@/types/constants/Tobe";
const CoursePurchaseCard = ({ item }: TOBE) => {
  const router = useRouter()
  return (
    <Card className="w-[70vw] mt-5 md:mt-0 md:w-[20vw] pb-5">
      <div className="wrapper w-[90%] mx-auto mt-3">
        <img className="w-full" src={item?.thumbnail} alt="" />
        <div className="info mt-5">
          <p className="text-lg font-semibold">$ 799</p>
          <button onClick={(e)=> {
            e.preventDefault()
            router.push(`/courses/${item?._id}/purchase`)

          }} className="w-full py-2 bg-[#20B486] rounded-md text-white mt-2">
           Buy Now
          </button>
        </div>
        <div className="whatThisCourse mt-5  py-3 border-y   border-gray-300 flex gap-3 flex-col ">
          <h3 className="font-semibold text-lg">This courese Include</h3>
          <p>
            <VerifiedIcon className="text-[#20B486] mr-3" />
            Accessl All Time
          </p>
          <p>
            <VerifiedIcon className="text-[#20B486] mr-3" /> Accessl All Time
          </p>
          <p>
            <VerifiedIcon className="text-[#20B486] mr-3" /> Accessl All Time
          </p>
        </div>

        <div className="whatThisCourse mt-5  py-3 border-b   border-gray-300 flex gap-3 flex-col ">
          <h3 className="font-semibold text-lg">Training 5 or more people</h3>
          <p>
            Class, launched less than a year ago by Blackboard co-founder
            Michael Chasen, integrates exclusively...
          </p>
        </div>
        <div className="whatThisCourse mt-5  py-3 border-b   border-gray-300 flex gap-3 flex-col  ">
          <h3 className="font-semibold text-lg">Share this course</h3>
          <div className="flex gap-4">
            <div  className="h-8 w-8 rounded-full bg-[#20B486] flex items-center justify-center">
              <InstagramIcon className="text-white" />
            </div>

            <div className="h-8 w-8 rounded-full bg-[#20B486] flex items-center justify-center">
              <FacebookIcon className="text-white" />
            </div>

            <div className="h-8 w-8 rounded-full bg-[#20B486] flex items-center justify-center">
              <XIcon className="text-white" />
            </div>

            <div className="h-8 w-8 rounded-full bg-[#20B486] flex items-center justify-center">
              <XIcon className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CoursePurchaseCard;
