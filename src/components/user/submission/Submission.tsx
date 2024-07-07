"use client";
import { Card } from "@/components/ui/card";
import React from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { useQuery } from "@tanstack/react-query";
import { getSubmissionsHelper } from "@/helpers/course/courseApiHelper";
import { useParams } from "next/navigation";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
const Submission = () => {
  const { id } = useParams();
  const { data: allSubmission, isLoading } = useQuery({
    queryKey: ["allSubmissiom", id],
    queryFn: getSubmissionsHelper,
  });
  return (
    <div className="w-[80%] mx-auto mt-5">
      <h3 className="text-2xl font-semibold mb-7">Submission</h3>
      <div className="wrapper flex gap-5 flex-wrap  ">
        {allSubmission?.payload.map((submission: any) => (
          <Card className="w-[48%] h-72">
            <div className="wrapper w-[90%] mx-auto">
              <div className="user flex gap-3 mt-5 border-b border-gray-300 pb-3">
                <img
                  src="/avt.png"
                  className="w-16 h-16 object-cover"
                  alt="User Avatar"
                />
                <p className="text-lg font-semibold">
                  {submission?.userId.username}
                </p>
              </div>

              <div className="h-28 overflow-y-scroll mt-3 shadow-sm rounded-lg border border-gray-300 p-3 bg-gray-100">
                <pre>
                  <code>
                    {atob(submission?.problem)}
      
                  </code>
                </pre>
              </div>

              <div>
                <button className="mt-3 flex items-center bg-base-200 px-3 py-1.5 rounded-md">
                  <ThumbUpOffAltIcon  className="mr-1" />
                  <ThumbUpIcon className="mr-1"/>
                  Likes 0
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Submission;
