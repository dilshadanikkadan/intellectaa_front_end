import userService from "@/lib/api/user";
import { NewError } from "../error/serializeError";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import axios from "axios";
import { baseApi_ } from "@/lib/api/buildClient/buildClient";
import { TOBE } from "@/types/constants/Tobe";
export const userBlockHelper = async (payload: TOBE) => {
  try {
    const response = await userService.blockManage(payload);
    if (response.status === 200) {
      return {
        success: true,
        payload: response.data,
      };
    }
  } catch (error: TOBE) {
    throw NewError(error);
  }
};

export const getAllUserHelper = async (pageNumber: number, limit: number) => {
  try {
    const response = await axios.get(
      `${baseApi_}user/getAllUsers?_limit=${limit}&_page=${pageNumber}`,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      return {
        success: true,
        payload: response.data.users,
        totalCount: response.data.totalCount,
      };
    }
  } catch (error: TOBE) {
    throw NewError(error);
  }
};

export const instructorCreateHelper = async (payload: TOBE) => {
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
  } catch (error: TOBE) {
    throw NewError(error);
  }
};

export const userPrfilePatchHelper = async (payload: TOBE) => {
  try {
    const response = await userService.userProfilePatch(payload);
    console.log("response status ++++++++++", response.status);

    if (response.status === 200) {
      return {
        success: true,
        payload: response.data,
      };
    }
  } catch (error: TOBE) {
    throw NewError(error);
  }
};

export const getAllInstructorHelper = async (pageNumber: number, limit: number) => {
  try {
    // const response = await userService.getAllInstructor({}, {});
    const response = await axios.get(
      `${baseApi_}user/getAllInstructor?_limit=${limit}&_page=${pageNumber}`,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      return {
        success: true,
        payload: response.data.users,
        totalCount: response.data.totalCount,
      };
    }
  } catch (error: TOBE) {
    console.log(error.response.data.message);

    throw NewError(error);
  }
};
