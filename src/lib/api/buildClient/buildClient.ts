  import axios, { AxiosInstance } from "axios";

  const apiUrl = "/api";
  export const  baseApi_ = 'https://intellectaa-api-latest.onrender.com/api/'
  export const buildClient = (): AxiosInstance => {
    let apiClient;
    if (typeof window === "undefined") {
      console.log("🎇✨🧨🎇🎇🎊🎇+++++ IN SERVER +++🎇🎆🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈");
      apiClient = axios.create({
        baseURL: "https://intellectaa-api-latest.onrender.com/api/",
        withCredentials: true,
      }); 
      //
    } else {
      apiClient = axios.create({
        baseURL: "https://intellectaa-api-latest.onrender.com/api/",
        withCredentials: true,
      });
    }
  
    apiClient.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  
    apiClient.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        console.log("errror couured __________________",error);
        
        if (error.response && error.response.status === 401 ) {
          originalRequest._retry = true;

          try {
            
            const response = await axios.post(
              "https://www.medifly.site/api/auth/refreshToken",
              {},
              { withCredentials: true }
            );
  
            if (response.status === 200 || 201) {
              console.log("Token refreshed successfully");
              return apiClient(originalRequest);
            }
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
            return Promise.reject(refreshError);
          }
        }
  
        return Promise.reject(error);
      }
    );
  
    return apiClient;
  };
  