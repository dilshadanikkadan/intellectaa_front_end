"use client";
import { Card } from "@/components/ui/card";
import {
  allProblemsFetchHelper,
  dailyTaskHelper,
} from "@/helpers/course/courseApiHelper";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskAssign = () => {
  const [selectedTask, setSelectedTask] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const { data: allProblems, isLoading } = useQuery({
    queryKey: ["allProblems"],
    queryFn: allProblemsFetchHelper,
  });

  const formatProblemName = (s: string) => {
    return s.split("_").join(" ");
  };

  const handleTaskSelect = (problem: string) => {
    if (selectedTask.includes(problem)) {
      setSelectedTask(selectedTask.filter((task) => task !== problem));
    } else {
      setSelectedTask([...selectedTask, problem]);
    }
  };

  const handleTaskRemove = (problem: string) => {
    setSelectedTask(selectedTask.filter((task) => task !== problem));
  };

  const { mutate: taskAssignMutate } = useMutation({
    mutationFn: dailyTaskHelper,
    onSuccess: (data) => {
      alert("task added");
    },
    onError: (err: any) => {
      setError(err);
    },
  });

  const handleTasks = () => {
    taskAssignMutate({
      problems: selectedTask,
    });
    console.log({
      problems: selectedTask,
    });
  };
  return (
    <div className="w-[90%] mx-auto">
      <h3 className="text-2xl font-semibold">Add Daily Task</h3>

      <div className="wrappe w-full flex mt-5">
        <div className="left flex-[1]">
          <h3 className="text-xl font-semibold mb-2">All Tasks</h3>

          <Card className="mt-2 w-[90%] py-10 flex ">
            <div className="w-[90%] mx-auto flex flex-wrap gap-5">
              {allProblems?.payload.map((problem: string, i: number) => (
                <Card
                  key={i}
                  onClick={() => handleTaskSelect(problem)}
                  className={`h-8 w-[40%] flex items-center justify-center cursor-pointer
                    ${
                      selectedTask.includes(problem)
                        ? "bg-gray-800 text-white"
                        : ""
                    }
                  `}
                >
                  {formatProblemName(problem)}
                </Card>
              ))}
            </div>
          </Card>
        </div>
        <div className="right mt-2  flex-[1] ">
          <h3 className="text-xl  font-semibold mb-2">
            Assigned Task For Today
          </h3>
          <Card className="h-40 w-[85%]">
            <div className="w-[90%] mx-auto flex mt-3 flex-wrap gap-5">
              {selectedTask?.map((problem: string, i: number) => (
                <Card
                  key={i}
                  className={`h-8 w-[40%] flex items-center justify-center cursor-pointer bg-gray-800 text-white`}
                >
                  {formatProblemName(problem)}
                  <DeleteIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTaskRemove(problem);
                    }}
                    className="ml-2 cursor-pointer"
                  />
                </Card>
              ))}
            </div>
          </Card>
          {error && (
            <p className="mt-2 text-red-500">{error}</p>
          )}
          <button
            onClick={handleTasks}
            className="px-3 py-1.5 bg-gray-800 text-white mt-3 rounded-md"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskAssign;
