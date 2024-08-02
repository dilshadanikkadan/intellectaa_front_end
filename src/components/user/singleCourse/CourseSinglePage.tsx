"use client";
import { Card } from "@/components/ui/card";
import React, { useState, useEffect, useCallback } from "react";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import {
  getCourseeHelper,
  myCourseHelper,
} from "@/helpers/course/courseApiHelper";
import { useParams } from "next/navigation";
import { PlayCircle } from "lucide-react";
import CoursePurchaseCard from "./utilComponents/CoursePurchaseCard";
import WhatYouWillLearn from "./utilComponents/WhatYouWillLearn";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import EntrolledSector from "./EntrolledCourese/EntrolledSector";

const CourseSinglePage = () => {
  const { id } = useParams();
  const user = useUserStore((state) => state.user);
  const { data: course, isLoading } = useQuery({
    queryKey: ["course", id],
    queryFn: getCourseeHelper,
  });

  const [currentView, setCurrentView] = useState<any>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoKey, setVideoKey] = useState(0);

  useEffect(() => {
    console.log("this is my cloud name",process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    
    if (course?.payload) {
      setCurrentView(course.payload);
      setVideoSrc(course.payload.trailer || course.payload.video);
    }
  }, [course]);

  const handleLessonClick = useCallback((lesson: any) => {
    console.log("Lesson clicked:", lesson);
    setCurrentView(lesson);
    const newVideoSrc = lesson.video || lesson.trailer;
    console.log("New video source:", newVideoSrc);
    setVideoSrc(newVideoSrc);
    setVideoKey((prevKey) => prevKey + 1);
  }, []);

  const getPublicId = useCallback((url: string) => {
    if (!url) return "";
    const regex = /\/v\d+\/(.+)\.\w+$/;
    const match = url.match(regex);
    return match ? match[1] : url;
  }, []);

  const { data: myCorse } = useQuery({
    queryKey: ["mycourse", id],
    queryFn: myCourseHelper,
  });

  return (
    <div className="w-[88%] md:w-[80%] mx-auto mt-5  ">
      <div className="w-full h-52 ">
        <img
          src="/cBeadcrumbs.png"
          className="w-full h-full object-cover"
          alt=""
        />
      </div>

      {myCorse?.payload ? (
        <>
          <EntrolledSector
            course={course?.payload}
            myCourse={myCorse?.payload}
          />
        </>
      ) : (
        <div className="wrapper w-full flex flex-col md:flex-row ">
          <div className="left flex-[3] m-5">
            <Card className="h-52 md:h-80 w-full md:w-[90%] mx-auto">
              {isLoading || !videoSrc ? (
                <div className="flex items-center justify-center h-full">
                  Loading video...
                </div>
              ) : (
                <CldVideoPlayer
                  poster={currentView?.thumbnail}
                  key={videoKey}
                  width={100}
                  height={50}
                  // src={getPublicId(videoSrc)}
                  src={"https://res.cloudinary.com/dvqq5x5x6/video/upload/v1720097515/application/nxqhqddljasntvwxmhje.mp4"}
                  sourceTypes={["hls", "dash"]}
                  transformation={{ streaming_profile: "hd" }}
                />
              )}
            </Card>
            <WhatYouWillLearn />
            <div className="w-[90%] mx-auto mt-5">
              <h3 className="text-lg font-semibold">Course Content</h3>
              <Accordion type="single" collapsible className="w-full">
                {course?.payload.lessons.map((lesson: any, i: number) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger>Lesson {i + 1}</AccordionTrigger>
                    <AccordionContent className="hover:underline transition-all duration-200 cursor-pointer">
                      {lesson?.title}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
          <div className="right flex-[2] flex justify-center relative mt-10 md:mt-[-10%] z-50 ">
            <CoursePurchaseCard item={course?.payload} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseSinglePage;
