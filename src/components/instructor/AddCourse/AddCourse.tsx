"use client";
import React, { useEffect, useMemo, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Input from "@/styles/ui/Input";
import { openEditor } from "react-profile";
import "react-profile/themes/default";
import { courseForm } from "@/utils/FormData/CourseForm";
import CategorySelectors from "./CategorySelectors";
import { useFormStore } from "@/hooks/UseFormStore";
import LanguageSelector from "./LanguageSelector";
import { UseCloudinaryImage } from "@/hooks/UseCloudinaryImage";
import { UseCloudinaryVideo } from "@/hooks/UseCloudinaryVideo";
import { useRouter } from "next/navigation";
import { UseLocalStorage, UseLocalStroageValue } from "@/hooks/UseLocalStorage";
import DraftCourse from "./DraftCourse";
import AddProgressBar from "./AddProgressBar";
import { useProgress } from "@/hooks/UseProgress";
import { PiSpinnerBold } from "react-icons/pi";
import { Progress } from "@/components/ui/progress";
import UploadModal from "./utilComponent/UploadModal";
import UploadComponent from "./utilComponent/UploadComponent";

const AddCourse = () => {
  const savedDraft = UseLocalStroageValue("courseDraft");
  if (savedDraft) return <DraftCourse />;

  const [error, setError] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trailer, setTrailer] = useState<File | null>(null);
  const [progressImg, setprogressImg] = useState<number>(0);
  const [progressBar, setprogressBar] = useState<number>(0);
  const setKeyValue = useFormStore((state) => state.setKeyValue);
  const formData = useFormStore((state) => state.formData);
  const setProgress = useProgress((state) => state.setPercentage);
  const [tileDescription, setTileDescription] = useState<{
    [key: string]: any;
  }>({});

  const router = useRouter();
  const handleImageThumbnail = async (e: any) => {
    const img = await openEditor({ src: e.target.files[0] });
    setThumbnail(img?.editedImage?.getDataURL() as string);
  };

  const handleVideoTrailer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTrailer(file);
    }
  };

  const addLesson = async () => {
    if (!trailer || !thumbnail) {
      setError("please provide tubmnail");
      return;
    }
    if (Object.values(tileDescription).length === 0) {
      setError("please provide title Description");
      return;
    }
    setIsModalOpen(true);
    setProgress(25);
    const thumbnailImage = await UseCloudinaryImage(thumbnail, setprogressImg);
    const {secure_url,duration}:any = await UseCloudinaryVideo(trailer, setprogressBar);
    setProgress(100);
    const newData = {
      ...tileDescription,
      thumbnail: thumbnailImage,
      trailer: secure_url,
      duration,
    };
    setKeyValue(newData);
    const updatedFormData = useFormStore.getState().formData;

    console.log("Updated FormData:", updatedFormData);
    UseLocalStorage("courseDraft", updatedFormData);
    setIsModalOpen(false);
    router.push("/instructor/myCourses/addCourse/addLesson");
  };

  useEffect(() => {
    if (progressBar === 100) {
      setProgress(0);
      return;
    } else if (progressBar > 25) {
      setProgress(progressBar);
    }

    return () => {
      setProgress(0);
    };
  }, [progressBar]);
  const MemoizedVideo = useMemo(() => {
    if (trailer) {
      return (
        <video
          className="h-[90%] object-cover object-center w-[95%] m-auto"
          src={URL.createObjectURL(trailer)}
          controls
        />
      );
    }
    return null;
  }, [trailer]);
  return (
    <>
      <div className="w-[90%] mx-auto  flex ">
        <Progress className="h-2 absolute " value={33} />
        <section className="flex-[1] mt-5 w-[100%] flex flex-col">
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
            <div
              key={i}
              className="w-[90%] flex-col items-center justify-center"
            >
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
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button
            onClick={addLesson}
            className="800 mt-3 flex items-center justify-center text-white bg-gray-900 w-[28%] py-[6px] mr-16"
          >
            Add Lesson
            {/* <PiSpinnerBold fontSize={26} className="ml-3 font-normal" /> */}
          </button>
        </section>

        <div className="flex-[1] mt-5 flex flex-col">
          <div className="w-[90%] rounded-lg border-2 flex flex-col items-center justify-center border-dashed border-gray-300 h-56">
            {trailer ? (
              MemoizedVideo
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
            name="price"
            placeholder="price"
            onChange={(e) => setKeyValue({ [e.target.name]: e.target.value })}
            className="border-[1px] max-w-lg rounded-sm placeholder:text-gray-800 shadow-sm border-gray-300 w-[100%] h-10 mt-4 text-sm"
          />
        </div>
        <div className="w-10 h-10 bg-red-300">
          <UploadModal
            isOpen={isModalOpen}
            onOpenChange={setIsModalOpen}
            percentage={progressBar}
          />
        </div>
      </div>
    </>
  );
};

export default AddCourse;
