import axios from "axios";

export const UseCloudinaryVideo = async (video: any,setPrgress:any) => {
  try {
    const data = new FormData();
    data.append("file", video);
    data.append("upload_preset", "application");

    let res;
    if (video) {
      res = await axios.post(
        "https://api.cloudinary.com/v1_1/dvqq5x5x6/video/upload",
        data,
        {
          onUploadProgress: (progress) => {
            if (!progress?.total) return;
            const percentage = Math.round(
              (progress.loaded * 100) / progress?.total
            );
            setPrgress(percentage)
            // console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",percentage  );
            
          },
          withCredentials: false,
        }
      );

      const { secure_url,duration } = res?.data;
      return {secure_url,duration}
    }
  } catch (error) {
    console.error("Error uploading video:", error);
  }
};
