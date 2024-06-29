"use client";
import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Input from "@/styles/ui/Input";
import { openEditor } from "react-profile";
import "react-profile/themes/default";
import { courseForm } from "@/utils/FormData/CourseForm";
import CategorySelectors from "./CategorySelectors";
import { useFormStore } from "@/hooks/UseFormStore";
import LanguageSelector from "./LanguageSelector";

const AddCourse = () => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [trailer, setTrailer] = useState<string | null>(null);
  const setKeyValue = useFormStore((state) => state.setKeyValue);
  const formData = useFormStore((state) => state.formData);
  const [tileDescription, setTileDescription] = useState<{
    [key: string]: any;
  }>({});

  const handleImageThumbnail = async (e: any) => {
    const img = await openEditor({ src: e.target.files[0] });
    setThumbnail(img?.editedImage?.getDataURL() as string);
  };

  const handleVideoTrailer = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setTrailer(videoUrl);
    }
  };

  console.log("__________________", formData);

  const addLesson = () => {
    console.log(tileDescription);
    setKeyValue(tileDescription);
  };

  return (
    <div className="w-[90%] mx-auto flex">
      <section className="flex-[1] flex flex-col">
        <div className="w-[90%] shadow-sm rounded-lg border-2 flex flex-col items-center justify-center border-dashed border-gray-300 h-56">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt=""
              className="h-[90%] object-cover object-center w-[95%] m-auto"
            />
          ) : (
            <div className="rounded-md p-4">
              <label
                htmlFor="upload-thumbnail"
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <CloudUploadIcon />
                <p>Please Upload Thumbnail</p>
              </label>
              <input
                onChange={handleImageThumbnail}
                id="upload-thumbnail"
                type="file"
                className="hidden"
              />
            </div>
          )}
        </div>
        {courseForm.map((input, i) => (
          <div key={i} className="w-[90%] flex-col items-center justify-center">
            <Input
              name={input.name}
              onChange={(e) =>
                setTileDescription((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              placeholder={input.placeholder}
              className="border-[1px] max-w-lg rounded-sm placeholder:text-gray-800 shadow-sm border-gray-300 w-[100%] h-10 mt-4 text-sm"
            />
          </div>
        ))}

        <CategorySelectors />
        <LanguageSelector />
        <button
          onClick={addLesson}
          className="text-gray-800 mt-7 border border-gray-800 w-[25%] py-[6px] mr-16"
        >
          Add Lesson
        </button>
      </section>

      <div className="flex-[1] flex flex-col">
        <div className="w-[90%] rounded-lg border-2 flex flex-col items-center justify-center border-dashed border-gray-300 h-56">
          {trailer ? (
            <video
              className="h-[90%] object-cover object-center w-[95%] m-auto"
              src={trailer}
              controls
            />
          ) : (
            <div className="rounded-md p-4">
              <label
                htmlFor="upload-trailer"
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <CloudUploadIcon />
                <p>Please Upload Trailer</p>
              </label>
              <input
                onChange={handleVideoTrailer}
                id="upload-trailer"
                type="file"
                className="hidden"
              />
            </div>
          )}
        </div>

        <Input
          placeholder="price"
          className="border-[1px] max-w-lg rounded-sm placeholder:text-gray-800 shadow-sm border-gray-300 w-[100%] h-10 mt-4 text-sm"
        />
      </div>
    </div>
  );
};

export default AddCourse;
