import userService from "@/lib/api/user";
import { NewError } from "../error/serializeError";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import axios from "axios";
import { baseApi_ } from "@/lib/api/buildClient/buildClient";
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

export const getAllUserHelper = async (pageNumber: number, limit: number) => {
  try {
    const response = await axios.get(
      `${baseApi_}user/getAllUsers?_limit=${limit}&_page=${pageNumber}`
    );
    if (response.status === 200) {
      return {
        success: true,
        payload: response.data.users,
        totalCount: response.data.totalCount,
      };
    }
  } catch (error: any) {
    throw NewError(error);
  }
};

export const instructorCreateHelper = async (payload: any) => {
  console.log("payload from isntrictier helper ++++++++++", payload);
  try {
    const response = await userService.instroctorCreate(payload);
    console.log("response status ++++++++++", response.status);

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

export const userPrfilePatchHelper = async (payload: any) => {
  try {
    const response = await userService.userProfilePatch(payload);
    console.log("response status ++++++++++", response.status);

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

export const getAllInstructorHelper = async (id?: any) => {
  try {
    const response = await userService.getAllInstructor({}, {});
    if (response.status === 200) {
      return {
        success: true,
        payload: response.data,
      };
    }
  } catch (error: any) {
    console.log(error.response.data.message);

    throw NewError(error);
  }
};
