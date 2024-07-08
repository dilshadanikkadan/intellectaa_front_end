"use client";
import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CldVideoPlayer } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getMySubmissionHelper } from "@/helpers/course/courseApiHelper";

const EntrolledSector = ({ course }: any) => {
  const [current, setCurrent] = useState<any>(null);

  const [videoKey, setVideoKey] = useState(0);
  const router = useRouter();

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
  // console.log("_______________",mySubmission);

  return (
    <div className="w-full mx-auto flex mt-10 mb-10 gap-10 ">
      <div className="left flex-[3]  mx-auto">
        {current && (
          <Card className="w-[100%] mx-auto h-96">
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
                <button

                  className="py-2 bg-gray-800 text-white  px-3 mt-4"
                >
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
      </div>
    </div>
  );
};

export default EntrolledSector;
