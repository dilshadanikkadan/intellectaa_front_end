"use client";
import { Card } from "@/components/ui/card";
import React, { useEffect, useState, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CldVideoPlayer } from "next-cloudinary";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getMySubmissionHelper,
  updateProgressCourseHelper,
} from "@/helpers/course/courseApiHelper";
import { useUserStore } from "@/store/storeProviders/UseUserStore";

const EntrolledSector = ({ course,myCourse }: any) => {
  const [current, setCurrent] = useState<any>(null);
  const [videoKey, setVideoKey] = useState(0);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const { id }: any = useParams();
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
    if (mySubmission) {
      console.log("My submission data:", mySubmission);
    }
  }, [mySubmission]);
console.log("_______++++++++++++___",myCourse);

  useEffect(() => {
    const videoElement = videoWrapperRef.current?.querySelector("video");
    const handleTimeUpdate = () => {
      if (videoElement) {
        const currentTime = videoElement.currentTime;
        const duration = videoElement.duration;
        const percentage = (currentTime / duration) * 100;

        if (percentage >= 80) {
          console.log("Video has reached 80%");
          console.log("currentLesson", current?._id);
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

  return (
    <div className="w-full mx-auto flex mt-10 mb-10 gap-10 ">
      <div className="left flex-[3]  mx-auto">
        {current && (
          <Card className="w-[100%] mx-auto h-96" ref={videoWrapperRef}>
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
        <div className="mt-10 flex flex-col gap-5">
          <p className="text-xl font-semibold">{current?.title}</p>
          <p>{current?.description}</p>
        </div>

        {current?.problems && (
          <div className="mt-10   gap-5">
            <p className="text-xl font-semibold">Assignment</p>

            {mySubmission?.payload ? (
              <div className="flex gap-3">
                <button className="py-2 bg-gray-800 text-white  px-3 mt-4">
                  Completed
                </button>
                <button
                  onClick={() =>
                    router.push(`/problems/${current?.problems[0]}/submission`)
                  }
                  className="py-2 bg-gray-800 text-white  px-3 mt-4"
                >
                  View Submission
                </button>
              </div>
            ) : (
              <button
                onClick={() => router.push(`/problems/${current?.problems[0]}`)}
                className="py-2 bg-gray-800 text-white  px-3 mt-4"
              >
                Go And Code
              </button>
            )}
          </div>
        )}
      </div>
      <div className="right  mx-auto flex-[2]">
        <Accordion type="single" collapsible className="w-full">
          {course?.lessons.map((lesson: any, i: number) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>Lesson {i + 1}</AccordionTrigger>
              <AccordionContent
                onClick={() => {
                  setCurrent(lesson);
                  setVideoKey((prev) => prev + 1);
                }}
                className="hover:underline transition-all duration-200 cursor-pointer"
              >
                {lesson?.title}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {
          myCourse?.courseMode ==="premium" &&
          <button onClick={()=> router.push(`/courses/${id}/chat`)} className="text-white bg-[#20B486] rounded-md py-2 px-5 float-left mt-14">Chat Room</button>
        }
      </div>
    </div>
  );
};

export default EntrolledSector;
