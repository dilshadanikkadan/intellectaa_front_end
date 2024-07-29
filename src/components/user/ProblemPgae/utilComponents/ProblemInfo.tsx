"use client";
import { Card } from "@/components/ui/card";
import { useParams } from "next/navigation";
import React from "react";
import DescriptionIcon from "@mui/icons-material/Description";

const ProblemInfo = ({ readFile, testCase, outPut }: any) => {
  const { id }: any = useParams();
  const readMd = readFile?.readMd.split("__").map((x: any) => x.trim());
  const allOut = outPut?.expectedOut.split("__").map((x: any) => x.trim());
  const allTestCase = testCase?.testCases
    ?.split("__")
    .map((test: any) => test.trim());
  console.log(readMd);

  return (
    <Card className="h-[90vh] ">
      <div className="h-7 w-full bg-[#FAFAFA] flex items-center ">
        <p className="text-sm font-semibold flex items-center ml-2">
          <DescriptionIcon fontSize="small" className="text-blue-500 text-[1.4rem]" />{" "}
          <span className="ml-2">Description</span>
        </p>
      </div>
      <div className="wrapper w-[90%] mx-auto">
        <div className="info mt-10 flex flex-col gap-4">
          <h3 className="text-xl font-semibold">1. {id.split("_") as any}</h3>
          {readMd?.map((item: any, i: number) => (
            <p key={i}>{item}</p>
          ))}
        </div>
        <div className="question mt-10">
          <h2 className="text-lg font-semibold">Example 1</h2>
          <div className="exa border-l pl-5 border-gray-300 py-2 mt-3">
            <p>
              <span className="font-semibold">Input:</span> case ={" "}
              {allTestCase && allTestCase[0]},
            </p>
            <p>
              <span className="font-semibold">Output:</span>{" "}
              {allOut && allOut[0]}{" "}
            </p>
          </div>
          <h2 className="text-lg font-semibold mt-3">Example 2</h2>

          <div className="exa border-l pl-5 border-gray-300 py-2 mt-3">
            <p>
              <span className="font-semibold">Input:</span> case ={" "}
              {allTestCase && allTestCase[1]},
            </p>
            <p>
              <span className="font-semibold">Output:</span>{" "}
              {allOut && allOut[1]}{" "}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProblemInfo;
