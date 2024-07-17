import axios from "axios";

export const UseCloudinaryAudio = async (audio: any) => {
  try {
    const data = new FormData();
    data.append("file", audio);
    data.append("upload_preset", "application");

    let res;
    if (audio) {
      res = await axios.post(
          "https://api.cloudinary.com/v1_1/dvqq5x5x6/raw/upload/",
        data,
        {
          withCredentials: false,
        }
      );

      const { secure_url } = res?.data;
      return secure_url;
    }
  } catch (error) {}
};
