"use client";
import React, { useMemo, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { openEditor } from "react-profile";
import "react-profile/themes/default";

interface Props {
    setThumbnail: any;
    thumbnail: any;
}
const ThumbnailComponent = ({ setThumbnail ,thumbnail}: Props) => {
  const handleImageThumbnail = async (e: any) => {
    const img = await openEditor({ src: e.target.files[0] });
    setThumbnail(img?.editedImage?.getDataURL() as string);
  };
  return (
    <div>
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
    </div>
  );
};

export default ThumbnailComponent;
