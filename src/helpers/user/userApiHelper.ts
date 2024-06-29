import userService from "@/lib/api/user";
import { NewError } from "../error/serializeError";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
export const userBlockHelper = async (payload: any) => {
    try {
      const response = await userService.blockManage(payload);
      if (response.status === 200) {
        return {
          success: true,
          payload: response.data,
        };
      }
    } catch (error: any) {
      throw NewError(error);
    }
  };
  
  export const getAllUserHelper = async (payload: any) => {
    try {
      const response = await userService.getAllUser(payload);
      if (response.status === 200) {
        return {
          success: true,
          payload: response.data,
        };
      }
    } catch (error: any) {
      throw NewError(error);
    }
  };

  export const instructorCreateHelper = async (payload: any) => {
    console.log("payload from isntrictier helper ++++++++++",payload);
    try {
      const response = await userService.instroctorCreate(payload);
      console.log("response status ++++++++++",response.status);
      
      if (response.status === 200) {
        return {
          success: true,
          payload: response.data,
        };
      }
    } catch (error: any) {
      throw NewError(error);
    }
  };