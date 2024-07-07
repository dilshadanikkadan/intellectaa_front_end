"use client";
import React, { useMemo, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
interface Props{
    resourse:any;
    setResource:any
}
const VideoUlploadComponent = ({setResource,resourse}:Props) => {
  const handleVideoResources = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResource(file);
    }
  };
  const MemoizedVideo = useMemo(() => {
    if (resourse) {
      return (
        <video
          className="h-[90%] object-cover object-center w-[95%] m-auto"
          src={URL.createObjectURL(resourse)}
          controls
        />
      );
    }
    return null;
  }, [resourse]);
  return (
    <div>
      <div className="w-[90%] rounded-lg mt-3 border-2 flex flex-col items-center justify-center border-dashed border-gray-300 h-56">
        {resourse ? (
          MemoizedVideo
        ) : (
          <div className="rounded-md p-4">
            <label
              htmlFor="upload-trailer"
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <CloudUploadIcon />
              <p>Please Upload Resorces</p>
            </label>
            <input
              onChange={handleVideoResources}
              id="upload-trailer"
              type="file"
              className="hidden"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoUlploadComponent;
