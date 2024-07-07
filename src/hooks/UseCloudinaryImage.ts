import axios from "axios";

export const UseCloudinaryImage = async (image: string,setprogressImg?:any ) => {
  try {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "application");


    let res;
    if (image) {
      res = await axios.post(
        "https://api.cloudinary.com/v1_1/dvqq5x5x6/image/upload",
        data,
        {
          onUploadProgress: (progress) => {
            if (!progress?.total) return;
            const percentage = Math.round(
              (progress.loaded * 100) / progress?.total
            );
            // console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",percentage  );
            setprogressImg(percentage)
          },
          withCredentials: false,
        },
     
      );
      
      
      const { secure_url } = res?.data;
      return  secure_url;
    }
  } catch (error) {}
};
