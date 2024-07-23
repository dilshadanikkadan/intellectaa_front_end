"use client";
import React, { useState } from "react";
import { useFormStore } from "@/hooks/UseFormStore";
import { UseCloudinaryImage } from "@/hooks/UseCloudinaryImage";
import { UseCloudinaryVideo } from "@/hooks/UseCloudinaryVideo";
import { UseLocalStorage } from "@/hooks/UseLocalStorage";
import { lessonForm } from "@/utils/FormData/LessonForm";
import ThumbnailComponent from "./utilComponents/ThumbnailComponent";
import VideoUlploadComponent from "./utilComponents/VideoUlploadComponent";
import AddProblems from "./AddProblems";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import UploadModal from "../AddCourse/utilComponent/UploadModal";
import { TOBE } from "@/types/constants/Tobe";
interface TitleDescription {
  title: string;
  description: string;
}
const AddLesson = () => {
  const [lessons, setLessons] = useState([
    {
      titleDescription: { title: "", description: "" },
      thumbnail: "",
      resource: null,
      selectedProblems: [],
    },
  ]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const [progressBar, setProgressBar] = useState(0);
  const setKeyValue = useFormStore((state) => state.setKeyValue);
  const [progressImg, setprogressImg] = useState<number>(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const handleInputChange = (lessonIndex: number, key: string, value: TOBE) => {
    setLessons((prevLessons) =>
      prevLessons.map((lesson, index) =>
        index === lessonIndex ? { ...lesson, [key]: value } : lesson
      )
    );
  };

  const handleThumbnailChange = (lessonIndex: number, value: TOBE) => {
    handleInputChange(lessonIndex, "thumbnail", value);
  };

  const handleResourceChange = (lessonIndex: number, value: TOBE) => {
    handleInputChange(lessonIndex, "resource", value);
  };
  const addLesson = async () => {
    setOverallProgress(0);
    try {
      const totalLessons = lessons.length;
      const totalUploads = totalLessons * lessons.length;
      let completedUploads = 0;

      const processedLessons = await Promise.all(
        lessons.map(async (lesson, lessonIndex) => {
          const { titleDescription, thumbnail, resource, selectedProblems } =
            lesson;
          if (!titleDescription.title || !titleDescription.description) {
            throw new Error(
              "Please fill in title and description for all lessons"
            );
          }
          if (!thumbnail || !resource) {
            throw new Error(
              "Thumbnail or resource not provided for all lessons"
            );
          }
          setIsModalOpen(true);

          const updateProgress = (uploadIndex: TOBE, progress: TOBE) => {
            const baseProgress = (completedUploads / totalUploads) * 100;
            const currentProgress = (progress / 100) * (1 / totalUploads) * 100;
            setOverallProgress((prev) =>
              Math.max(prev, Math.min(baseProgress + currentProgress, 100))
            );
          };

          const thumbnailImage = await UseCloudinaryImage(
            thumbnail,
            (progress: TOBE) => updateProgress(0, progress)
          );
          completedUploads++;
          updateProgress(0, 100);

          const { secure_url, duration }: TOBE = await UseCloudinaryVideo(
            resource,
            (progress: TOBE) => updateProgress(1, progress)
          );
          completedUploads++;
          updateProgress(1, 100);

          return {
            ...titleDescription,
            thumbnail: thumbnailImage,
            video: secure_url,
            duration,
            problems: selectedProblems,
            lessonNumber: lessonIndex + 1,
          };
        })
      );

      setKeyValue({ lessons: processedLessons });

      const updatedFormData = useFormStore.getState().formData;
      console.log("Updated FormData:", updatedFormData);
      UseLocalStorage("lessonDraft", updatedFormData);

      setOverallProgress(100);
      router.push("/instructor/myCourses/addCourse/addLesson/preview");
      setIsModalOpen(false);
    } catch (error: TOBE) {
      console.error("Error adding lessons:", error);
      setError(error.message || "Error adding lessons. Please try again.");
    } finally {
    }
  };
  const addNewLesson = () => {
    setLessons((prevLessons) => [
      ...prevLessons,
      {
        titleDescription: { title: "", description: "" },
        thumbnail: "",
        resource: null,
        selectedProblems: [],
      },
    ]);
  };
  console.log("over allProgress", overallProgress);

  return (
    <div className="w-[90%] mx-auto flex flex-col">
      <Progress value={66} className="h-2 mb-3" />
      {lessons.map((lesson, index) => (
        <div key={index} className="flex mb-8">
          <section className="flex-1 flex flex-col">
            <h1 className="mb-3">Lesson {index + 1}: Python Tutorial</h1>
            <ThumbnailComponent
              setThumbnail={(value: TOBE) =>
                handleThumbnailChange(index, value)
              }
              thumbnail={lesson.thumbnail}
            />
            <VideoUlploadComponent
              setResource={(value: TOBE) => handleResourceChange(index, value)}
              resourse={lesson.resource}
            />
            {lessonForm.map((input, i) => (
              <div
                key={i}
                className="w-[90%] flex-col items-center justify-center"
              >
                <input
                  name={input.name}
                  value={
                    lesson.titleDescription[
                      input.name as keyof TitleDescription
                    ] || ""
                  }
                  onChange={(e) => {
                    setError("");
                    handleInputChange(index, "titleDescription", {
                      ...lesson.titleDescription,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  placeholder={input.placeholder}
                  className="pl-3 border-[1px] max-w-lg rounded-sm placeholder:text-gray-800 shadow-sm border-gray-300 w-[100%] h-10 mt-4 text-sm"
                />
              </div>
            ))}
          </section>
          <div className="flex-1 flex flex-col">
            <div className="w-[90%] mt-9 rounded-lg flex flex-col">
              <h3 className="mb text-lg">All Problems</h3>
              <AddProblems
                setSelectedProblems={(problems) =>
                  handleInputChange(index, "selectedProblems", problems)
                }
                selectedProblems={lesson.selectedProblems}
              />
            </div>
          </div>
        </div>
      ))}
      {error && <p className="text-red-500 mt-1">{error}</p>}
      <div className="w-full justify-between">
        <button
          onClick={addNewLesson}
          className="text-gray-800 mt-7 border border-gray-800 w-[20%] py-[6px] mr-16"
        >
          Add More Lesson
        </button>
        <button
          onClick={addLesson}
          className="text-gray-800 mt-7 border border-gray-800 w-[20%] py-[6px] mr-16"
        >
          Add Lessons
        </button>
      </div>
      <UploadModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        percentage={overallProgress}
      />
    </div>
  );
};

export default AddLesson;
