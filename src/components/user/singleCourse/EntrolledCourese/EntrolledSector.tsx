"use client";
import { Card } from "@/components/ui/card";
import React, { useEffect, useState, useRef } from "react";
import { CldVideoPlayer } from "next-cloudinary";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getMySubmissionHelper,
  updateProgressCourseHelper,
} from "@/helpers/course/courseApiHelper";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ChatIcon from "@mui/icons-material/Chat";
import { TOBE } from "@/types/constants/Tobe";
import { Certificate } from "./Certificate";

const EnrolledSector = ({ course, myCourse }: TOBE) => {
  const [current, setCurrent] = useState<TOBE>(null);
  const [videoKey, setVideoKey] = useState(0);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const { id }: TOBE = useParams();
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const { mutate: progressMutate } = useMutation({
    mutationFn: updateProgressCourseHelper,
    onSuccess: (data) => {},
  });

  useEffect(() => {
    if (course) {
      setCurrent(course);
    }
  }, [course]);

  const {
    data: mySubmission,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mySubmission", current?.problems?.[0] ?? "add_num_001"],
    queryFn: getMySubmissionHelper,
    enabled: !course?.problems,
  });

  useEffect(() => {
    const videoElement = videoWrapperRef.current?.querySelector("video");
    const handleTimeUpdate = () => {
      if (videoElement) {
        const currentTime = videoElement.currentTime;
        const duration = videoElement.duration;
        const percentage = (currentTime / duration) * 100;

        if (percentage >= 80) {
          progressMutate({
            courseId: id,
            userId: user?._id,
            lessonId: current?._id,
          });
        }
      }
    };

    if (videoElement) {
      videoElement.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [videoKey]);
  console.log("____________", mySubmission?.payload);

  return (
    <div className="w-full mx-auto flex flex-col lg:flex-row mt-10 mb-10 gap-10">
      <div className="left flex-[3]">
        {current && (
          <Card className="w-[100%] mx-auto h-64 md:h-96" ref={videoWrapperRef}>
            <CldVideoPlayer
              poster={current?.thumbnail}
              key={videoKey}
              width={100}
              height={50}
              src={current?.trailer ?? current?.video}
              sourceTypes={["hls", "dash"]}
              transformation={{ streaming_profile: "hd" }}
            />
          </Card>
        )}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">{current?.title}</h2>
          <p className="text-gray-600">{current?.description}</p>
        </div>

        {current?.problems && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Assignment</h3>
            {mySubmission?.payload.length > 0 ? (
              <div className="flex gap-4">
                <button className="py-2 px-4 bg-green-500 text-white rounded-md flex items-center">
                  <CheckCircleIcon className="mr-2" /> Completed
                </button>
                <button
                  onClick={() =>
                    router.push(`/problems/${current?.problems[0]}/submission`)
                  }
                  className="py-2 px-4 bg-blue-500 text-white rounded-md flex items-center"
                >
                  <AssignmentIcon className="mr-2" /> View Submission
                </button>
              </div>
            ) : (
              <button
                onClick={() => router.push(`/problems/${current?.problems[0]}`)}
                className="py-2 px-4 bg-indigo-600 text-white rounded-md flex items-center"
              >
                <PlayArrowIcon className="mr-2" /> Go and Code
              </button>
            )}
          </div>
        )}
      </div>
      <div className="right flex-[2]">
        <div className="bg-gray-100 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Course Content</h3>
          {course?.lessons.map((lesson: TOBE, i: number) => (
            <div key={i} className="mb-4">
              <button
                onClick={() => {
                  setCurrent(lesson);
                  setVideoKey((prev) => prev + 1);
                }}
                className={`w-full text-left py-2 px-4 rounded-md transition-colors duration-200 ${
                  current?._id === lesson?._id
                    ? "bg-[#20B486] text-white"
                    : "bg-white hover:bg-[#e6f7f2]"
                }`}
              >
                <span className="font-medium">Lesson {i + 1}:</span>{" "}
                {lesson?.title}
              </button>
            </div>
          ))}
        </div>

        {myCourse?.courseMode === "premium" && (
          <button
            onClick={() => router.push(`/courses/${id}/chat`)}
            className="mt-6 w-full py-3 px-4 bg-[#20B486] text-white rounded-md flex items-center justify-center"
          >
            <ChatIcon className="mr-2" /> Chat Room
          </button>
        )}
        <button
          onClick={() => {
            Certificate(
              "John Doe",
              "Advanced React Development",
              "July 23, 2024"
            );
          }}
          className="px-3 py-2 bg-teal-700 rounded-md text-white"
        >
          {" "}
          Download
        </button>
      </div>
    </div>
  );
};

export default EnrolledSector;
