import { TOBE } from "@/types/constants/Tobe";
import React from "react";
import { CiWavePulse1 } from "react-icons/ci";
interface Props {
  totalCourse?: TOBE;
  totalUsers?: TOBE;
  totalProfit?: TOBE;
  totalStudent?: TOBE;
}
const Analaysis = ({ totalCourse, totalProfit, totalUsers,totalStudent }: Props) => {
  return (
    <>
      <section className="w-[90%] flex-col md:flex-row mx-auto flex gap-6 mb-10">
        <div className="w-[22%]  border-l-2 border-gray-600 h-20 flex  items-center gap-8   ">
          <div className="ml-10 flex gap-2 flex-col text-gray-700">
            <h3 className="font-semibold ml-3">Total course</h3>
            <span className="ml-3 font-semibold">{totalCourse}</span>
          </div>
          <CiWavePulse1 className="text-5xl ml-2 " />
        </div>

        <div className="w-[22%]  border-l-2 border-gray-600 h-20 flex items-center gap-8   ">
          <div className="ml-10 flex gap-2 flex-col text-gray-700">
            <h3 className="font-semibold ml-3">Total Profit</h3>
            <span className="ml-3 font-semibold">{totalProfit}</span>
          </div>
          <CiWavePulse1 className="text-5xl ml-2 " />
        </div>
        <div className="w-[22%]  border-l-2 border-gray-600 h-20 flex items-center gap-8   ">
          <div className="ml-10 flex gap-2 flex-col text-gray-700">
            <h3 className="font-semibold ml-3"> Students</h3>
            <span className="ml-3 font-semibold">{totalStudent}</span>
          </div>
          <CiWavePulse1 className="text-5xl ml-2 " />
        </div>
        <div className="w-[22%]  border-l-2 border-gray-600 h-20 flex items-center gap-8   ">
          <div className="ml-10 flex gap-2 flex-col text-gray-700">
            <h3 className="font-semibold ml-3">Total Users</h3>
            <span className="ml-3 font-semibold">{totalUsers}</span>
          </div>
          <CiWavePulse1 className="text-5xl ml-2 " />
        </div>
      </section>
    </>
  );
};

export default Analaysis;
