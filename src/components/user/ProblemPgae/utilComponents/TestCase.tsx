"use client";
import { Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import CodeIcon from "@mui/icons-material/Code";
interface Props {
  testCase: any;
  sumbmission: any;
  subMissionErr: any;
  setsubmissonResult: any;
  setsubMissionErr: any;
}

const TestCase = ({
  testCase,
  sumbmission,
  subMissionErr,
  setsubmissonResult,
  setsubMissionErr,
}: Props) => {
  const [submissonRes, setsubmissonRes] = useState<boolean>(true);
  const allTestCase = testCase?.testCases
    ?.split("__")
    .map((test: any) => test.trim());
  const [testIndex, setTestIndex] = useState<any>(0);

  useEffect(() => {
    if (sumbmission) {
      // if (sumbmission[0]?.result) {
      //   setsubMissionErr("can not read undefined propeties");
      //   return;
      // }
      sumbmission.map((x: any) => {
        if (x?.output === false) {
          setsubmissonRes(false);
          setsubmissonResult(false);
        } else {
          setsubmissonRes(true);
          setsubmissonResult(true);
        }
      });
    }
  }, [sumbmission]);
  console.log("_________&&&&&&&&&&& sumbmission", sumbmission);

  return (
    <Card className="w-full  pb-5">
      {subMissionErr ? (
        <div className="w-[90%] mx-auto  py-5 rounded-lg">
          <p className="text-xl font-semibold  text-red-500">Error</p>
          <div className="wrapper py-4 pl-3 mt-3 rounded-md bg-red-200 w-[100%] mx-auto">
            <p className="text-red-500">{subMissionErr}</p>
          </div>
        </div>
      ) : (
        <div className="w-full ">
          <div className="h-7 w-full bg-[#FAFAFA] flex items-center mb-2">
            <p className="text-sm font-semibold flex items-center ml-2">
              <CodeIcon
                fontSize="small"
                className="text-green-500 text-[1.4rem]"
              />{" "}
              <span className="ml-2">Test</span>
            </p>
          </div>
          {sumbmission && submissonRes ? (
            <p className="w-[90%] mx-auto text-green-500 my-1 font-semibold">
              Accepted
            </p>
          ) : sumbmission && submissonRes === false ? (
            <p className="w-[90%] mx-auto text-red-500 my-1 font-semibold">
              Rejected
            </p>
          ) : (
            ""
          )}
          <div className="wrapper w-[90%] mx-auto flex gap-5">
            {allTestCase?.map((item: any, i: number) => {
              // if (sumbmission[0]?.result) {
              //   setsubMissionErr("can not read undefined propeties");
              //   return;
              // }else{}
              return (
                <div key={i}>
                  <div
                    onClick={() => setTestIndex(i)}
                    className={`py-1.5 flex items-center px-3 bg-white cursor-pointer transition-all duration-200  ${
                      testIndex === i ? "bg-base-200" : ""
                    }  rounded-md`}
                  >
                    {sumbmission && sumbmission[i].output === true ? (
                      <div className="w-2 h-2 mr-1 rounded-full bg-green-500"></div>
                    ) : sumbmission && sumbmission[i].output === false ? (
                      <div className="w-2 h-2 mr-1 rounded-full bg-red-500"></div>
                    ) : (
                      ""
                    )}
                    Test {i + 1}
                  </div>
                </div>
              );
            })}
          </div>
          <span className="ml-8 mt-1">input</span>
          <p className="py-1.5 mt- pl-3 w-[90%] mx-auto rounded-md bg-gray-200">
            {allTestCase && allTestCase[testIndex]}
          </p>
          {sumbmission && (
            <>
              <span className="ml-8 mt-1">expected</span>
              <p className="py-1.5  pl-3 w-[90%] mx-auto rounded-md bg-gray-200">
                {sumbmission && sumbmission[testIndex].expected}
              </p>
            </>
          )}

          {sumbmission && (
            <>
              <span className="ml-8 mt-1">output</span>
              <p className="py-1.5  pl-3 w-[90%] mx-auto rounded-md bg-gray-200">
                {sumbmission && sumbmission[testIndex].result}
              </p>
            </>
          )}
        </div>
      )}
    </Card>
  );
};

export default TestCase;
