"use client";
import React, { useState } from "react";
import ProblemInfo from "../utilComponents/ProblemInfo";
import CodeWriter from "../utilComponents/CodeWriter";
import TestCase from "../utilComponents/TestCase";
import { useQuery } from "@tanstack/react-query";
import { codeFetchHelper } from "@/helpers/course/courseApiHelper";
import { useParams } from "next/navigation";

const ProblemPage = () => {
  const [language, setLanguage] = useState<string>("javaScript");
  const [sumbmission, setSumbmission] = useState<{}[] | null>(null);
  const [subMissionErr, setsubMissionErr] = useState<string>("");
  const [selectedLanguage,setSelectedLanguage]= useState<string>("javaScript")
  const [submissonResult, setsubmissonResult] = useState<boolean>(false);

  const { id } = useParams();
  const { data: currentCode } = useQuery({
    queryFn: codeFetchHelper,
    queryKey: ["code", id, selectedLanguage],
  });

  console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^",selectedLanguage);
  
  return (
    <div className="w-[90%] mx-auto flex flex-col md:flex-row gap-3 mt-5">
      <div className="left flex-[1]">
        <ProblemInfo
          readFile={currentCode?.payload[3]}
          testCase={currentCode?.payload[1]}
          outPut={currentCode?.payload[2]}
        />
      </div>
      <div className="right flex-[1] flex flex-col gap-3">
        <CodeWriter
        setSelectedLanguage={setSelectedLanguage}
        submissonResult={submissonResult}
          setsubMissionErr={setsubMissionErr}
          setSumbmission={setSumbmission}
          solution={currentCode?.payload[4]}
          selectedLanguage={selectedLanguage}
        />
        <TestCase
        setsubMissionErr={setsubMissionErr}
        setsubmissonResult={setsubmissonResult}
          subMissionErr={subMissionErr}
          sumbmission={sumbmission}
          testCase={currentCode?.payload[1]}
        />
      </div>
    </div>
  );
};

export default ProblemPage;
