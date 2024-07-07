"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { allProblemsFetchHelper } from "@/helpers/course/courseApiHelper";

interface Props {
  setSelectedProblems: (problems: string[]) => void;
  selectedProblems: string[];
}

const AddProblems = ({ setSelectedProblems, selectedProblems = [] }: Props) => {
  const handleProblemClick = (problem: string) => {
    if (selectedProblems.includes(problem)) {
      setSelectedProblems(selectedProblems.filter(p => p !== problem));
    } else {
      setSelectedProblems([...selectedProblems, problem]);
    }
  };

  const { data: allProblems, isLoading } = useQuery({
    queryKey: ["allProblems"],
    queryFn: allProblemsFetchHelper,
  });

  const formatProblemName = (s: string) => {
    return s.split("_").join(" ");
  };

  if (isLoading) return <div>Loading problems...</div>;

  return (
    <Card className="mt-2 w-[90%] py-10 flex ">
      <div className="w-[90%] mx-auto flex flex-wrap gap-5">

      {allProblems?.payload.map((problem: string, i: number) => (
        <Card
          key={i}
          onClick={() => handleProblemClick(problem)}
          className={`h-8 w-[40%] flex items-center justify-center cursor-pointer ${
            selectedProblems.includes(problem) ? 'bg-gray-800 text-white' : ''
          }`}
          >
          {formatProblemName(problem)}
        </Card>
      ))}
      </div>
    </Card>
  );
};

export default AddProblems;