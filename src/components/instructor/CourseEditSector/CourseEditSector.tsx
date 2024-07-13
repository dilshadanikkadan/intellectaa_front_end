"use client";
import React, { useState, useEffect } from "react";
import {
  getCourseeHelper,
  updateCourseHelper,
} from "@/helpers/course/courseApiHelper";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UseCloudinaryVideo } from "@/hooks/UseCloudinaryVideo";
import { UseCloudinaryImage } from "@/hooks/UseCloudinaryImage";
import { PiSpinnerBold } from "react-icons/pi";
import { useUserStore } from "@/store/storeProviders/UseUserStore";

const CourseEditSector = () => {
  const { id } = useParams();
  const router = useRouter();
  const {
    data: course,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["course", id],
    queryFn: getCourseeHelper,
  });

  const [editedCourse, setEditedCourse] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState<any>({});
  const [loading, setLoading] = useState<any>(false);
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    if (course?.payload) {
      setEditedCourse(course.payload);
    }
  }, [course]);

  const updateMutation = useMutation({
    mutationFn: updateCourseHelper,
    onSuccess: () => {
      console.log("done");
      refetch();
      router.push("/instructor/myCourses");
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!editedCourse) {
    return <div>No course data available</div>;
  }

  const handleInputChange = (e: any, field: any, lessonIndex = null) => {
    const { value } = e.target;
    if (lessonIndex !== null) {
      setEditedCourse((prev: any) => ({
        ...prev,
        lessons: prev.lessons.map((lesson: any, index: any) =>
          index === lessonIndex ? { ...lesson, [field]: value } : lesson
        ),
      }));
    } else {
      setEditedCourse((prev: any) => ({ ...prev, [field]: value }));
    }
  };

  const handleFileChange = (e: any, field: any, lessonIndex = null) => {
    const file = e.target.files[0];
    if (file) {
      const filePreview = URL.createObjectURL(file);
      if (lessonIndex !== null) {
        setEditedCourse((prev: any) => ({
          ...prev,
          lessons: prev.lessons.map((lesson: any, index: any) =>
            index === lessonIndex
              ? { ...lesson, [field]: file, [`${field}Preview`]: filePreview }
              : lesson
          ),
        }));
      } else {
        setEditedCourse((prev: any) => ({
          ...prev,
          [field]: file,
          [`${field}Preview`]: filePreview,
        }));
      }
    }
  };

  const handleUpload = async () => {
    setLoading(true)
    let updatedCourse = { ...editedCourse };
    
    if (updatedCourse.thumbnail && updatedCourse.thumbnail instanceof File) {
      const thumbnailUrl = await UseCloudinaryImage(
        updatedCourse.thumbnail,
        (progress: any) =>
          setUploadProgress((prev: any) => ({ ...prev, thumbnail: progress }))
      );
      updatedCourse.thumbnail = thumbnailUrl;
    }

    if (updatedCourse.trailer && updatedCourse.trailer instanceof File) {
      const { secure_url }: any = await UseCloudinaryVideo(
        updatedCourse.trailer,
        (progress: any) =>
          setUploadProgress((prev: any) => ({ ...prev, trailer: progress }))
      );
      updatedCourse.trailer = secure_url;
    }

    updatedCourse.lessons = await Promise.all(
      updatedCourse.lessons.map(async (lesson: any, index: number) => {
        if (lesson.video && lesson.video instanceof File) {
          const { secure_url }: any = await UseCloudinaryVideo(
            lesson.video,
            (progress: any) =>
              setUploadProgress((prev: any) => ({
                ...prev,
                [`lesson${index}`]: progress,
              }))
          );
          return { ...lesson, video: secure_url };
        }
        return lesson;
      })
    );
setLoading(false)
    setEditedCourse(updatedCourse);
    setUploadProgress({});
  };

  const handleSaveChanges = () => {
    const { instructor, ...rest } = editedCourse;
    console.log({
      id,
      updatedCourse: {
        instructor: user?._id,
        ...rest,
      },
    });
    updateMutation.mutate({ 
      id,
      updatedCourse: {
        instructor: user?._id,
        ...rest,
      },
     });
  };

  return (
    <div className="w-[90%] mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Course</h1>

      <div className="mb-4 ">
        <label className="block mb-2">Thumbnail</label>
        <input
          type="file"
          className=""
          onChange={(e) => handleFileChange(e, "thumbnail")}
          accept="image/*"
        />
        {editedCourse?.thumbnail && (
          <img
            src={editedCourse.thumbnailPreview || editedCourse.thumbnail}
            alt="Thumbnail"
            className="mt-2 w-96 h-60 object-cover"
          />
        )}
        {uploadProgress.thumbnail && (
          <p>Upload progress: {uploadProgress.thumbnail}%</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Trailer</label>
        <input
          type="file"
          onChange={(e) => handleFileChange(e, "trailer")}
          accept="video/*"
        />
        {editedCourse.trailer && (
          <video
            src={editedCourse.trailerPreview || editedCourse.trailer}
            className="mt-2 w-96 h-60"
            controls
          />
        )}
        {uploadProgress.trailer && (
          <p>Upload progress: {uploadProgress.trailer}%</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Title</label>
        <Input
          value={editedCourse.title}
          onChange={(e) => handleInputChange(e, "title")}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Description</label>
        <Textarea
          value={editedCourse.description}
          onChange={(e) => handleInputChange(e, "description")}
        />
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-4">Lessons</h2>
      {editedCourse.lessons.map((lesson: any, index: any) => (
        <Card key={index} className="p-4 mb-4">
          <h3 className="text-lg font-medium mb-2">Lesson {index + 1}</h3>
          <Input
            value={lesson.title}
            onChange={(e) => handleInputChange(e, "title", index)}
            className="mb-2"
            placeholder="Lesson Title"
          />
          <Textarea
            value={lesson.description}
            onChange={(e) => handleInputChange(e, "description", index)}
            className="mb-2"
            placeholder="Lesson Description"
          />
          <div className="mb-4">
            <label className="block mb-2">Lesson Video</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "video", index)}
              accept="video/*"
            />
            {lesson.video && (
              <video
                src={lesson.videoPreview || lesson.video}
                className="mt-2 w-96 h-60"
                controls
              />
            )}
            {uploadProgress[`lesson${index}`] && (
              <p>Upload progress: {uploadProgress[`lesson${index}`]}%</p>
            )}
          </div>
        </Card>
      ))}

      <Button onClick={handleUpload} className="mt-4 mr-4">
        Upload to Cloudinary
        {
          loading &&
        <PiSpinnerBold className="text-xl ml-2 animate-spin" />
        }
      </Button>
      <Button onClick={handleSaveChanges} className="mt-4">
        Save Changes
        {updateMutation?.isPending && (
          <PiSpinnerBold className="text-xl ml-2 animate-spin" />
        )}
      </Button>
    </div>
  );
};

export default CourseEditSector;
