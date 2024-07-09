"use client";
import { Card } from "@/components/ui/card";
import React from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSubmissionsHelper,
  likeSubmissionHelper,
} from "@/helpers/course/courseApiHelper";
import { useParams } from "next/navigation";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
const Submission = () => {
  const { id } = useParams();
  const user = useUserStore((state) => state.user);
  const { data: allSubmission, isLoading } = useQuery({
    queryKey: ["allSubmissiom", id],
    queryFn: getSubmissionsHelper,
  });

  console.log("**************************************",allSubmission);
  const queryClient = useQueryClient();

  const { mutate: submissionLikeMutate } = useMutation({
    mutationFn: likeSubmissionHelper,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["allSubmissiom"] as any);
    },
  });

  const handleLikes =(submissionId:string)=>{
      submissionLikeMutate({
        submissionId
      })
  }
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
                  {submission?.userId?.username}
                </p>
              </div>

              <div className="h-28 overflow-y-scroll mt-3 shadow-sm rounded-lg border border-gray-300 p-3 bg-gray-100">
                <pre>
                  <code>{atob(submission?.problem)}</code>
                </pre>
              </div>

              <div>
                <button className="mt-3 flex items-center bg-base-200 px-3 py-1.5 rounded-md">
                  {submission?.likes?.includes(user?._id) ? (
                    <ThumbUpIcon onClick={()=> handleLikes(submission?._id)} className="mr-1" />
                  ) : (
                    <ThumbUpOffAltIcon onClick={()=> handleLikes(submission?._id)}   className="mr-1" />
                  )}
                  Likes {submission?.likes.length}
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
