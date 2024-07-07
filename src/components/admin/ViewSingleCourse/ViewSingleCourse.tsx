"use client";
import { Card } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { getCourseeHelper } from "@/helpers/course/courseApiHelper";
import { useParams } from "next/navigation";
import { PlayCircle } from "lucide-react"; 
import PublishModal from "./utilComponents/PublishModal";

const ViewSingleCourse = () => {
  const { id } = useParams();

  const { data: course, isLoading } = useQuery({
    queryKey: ["course", id],
    queryFn: getCourseeHelper,
  });

  const [currentView, setCurrentView] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (course?.payload) {
      setCurrentView(course.payload);
    }
  }, [course]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!course?.payload) {
    return <div>No course data available</div>;
  }

  const handlePlay = () => {
    setIsPlaying(true);
  };

  console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^", currentView);

  return (
    <div className="w-[90%] mx-auto relative">
      <div className="wrapper flex w-[90%] mx-auto">
        <div className="left flex-[1] w-[90%] mx-auto">
          <p>Thumbnail / Video</p>
          <Card className="w-[100%] mt-3 mx-auto h-60 flex items-center justify-center relative">
            {currentView?.trailer && isPlaying ? (
              <video
                className="w-[95%] h-[95%] object-cover"
                src={currentView.trailer}
                controls
                autoPlay
              />
            ) : (
              <>
                <img
                  className="w-[95%] h-[95%] object-cover"
                  src={currentView?.thumbnail || course.payload.thumbnail}
                  alt=""
                />
                {currentView?.trailer && (
                  <button
                    onClick={handlePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity hover:bg-opacity-30"
                  >
                    <PlayCircle className="w-16 h-16 text-white" />
                  </button>
                )}
              </>
            )}
          </Card>

          <div className="info mt-5 flex flex-col gap-3">
            <h2 className="text-lg font-semibold">
              {currentView?.title || course.payload.title}
            </h2>
            <p>{currentView?.description || course.payload.description}</p>
          </div>
          <div className="info mt-5 flex flex-col gap-3">
            <h2 className="text-lg font-semibold">Problems Attached</h2>
            {currentView?.problems?.map((prb: any) => (
              <Card className=" h-10 w-[33%] flex items-center rounded-sm  py-1 px-4 ">
                {prb}
              </Card>
            ))}
          </div>
        </div>
        <div className="right flex-[1] ">
          <div className="w-[90%] mx-auto mt-10">
            <Accordion type="single" collapsible className="w-full">
              {course.payload.lessons.map((lesson: any, i: number) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger>Lesson {i + 1}</AccordionTrigger>
                  <AccordionContent
                    onClick={() => {
                      setCurrentView(lesson);
                      setIsPlaying(false);
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
      </div>
      <div>
        <div className="w-[90%] mx-auto  flex justify-between mt-10">
          <button className="py-2 px-5 rounded-md bg-gray-800 text-white">
           <PublishModal/>
          </button>
          <button className="py-2 px-5 rounded-md bg-gray-800 text-white">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewSingleCourse;
