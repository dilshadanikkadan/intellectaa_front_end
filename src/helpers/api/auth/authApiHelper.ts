import { NewError } from "@/helpers/error/serializeError";
import authService from "@/lib/api/auth";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import { TOBE } from "@/types/constants/Tobe";
import { redirect } from "next/navigation";

export const signupHelper = async (payload: TOBE) => {
  try {
    const response = await authService.signup(payload);
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

export const currentUserHelper = async (payload: TOBE) => {
  try {
    const response = await authService.currentuser(payload);
    if (response.status === 200) {
      return {
        success: true,
        payload: response.data
      };
    }
  } catch (error: TOBE) {
    throw NewError(error);
  }
};

export const verifyOtpHelper = async (payload: TOBE) => {
  try {
    const response = await authService.verifyOtp(payload);
    if (response.status === 200) {
      return {
        success: true,
        payload: response.data,
      };
    }
  } catch (error) {
    throw NewError(error);
  }
};

export const logoutHelper = async () => {
  try {
    const response = await authService.logout();
    if (response.status === 200) {
      return {
        success: true,
        payload: response.data,
      };
    }
  } catch (error) {
    throw NewError(error);
  }
};
export const googleAuthHelper = async (payload: TOBE) => {
  try {
 
    const response = await authService.googleSignup({
      ...payload,
    });
     
    
    if (response.status === 200) {
      return {
        success: true,
        payload: response, 
      };
    }
  } catch (error: TOBE) {
    throw error;
  }
};

export const authGooglePayload = (payload?: TOBE) => {
  return payload;
};

export const resentOtpHelper = async (payload: TOBE) => {
  try {
    console.log("payload from helpwe", payload);

    const response = await authService.resentOtp(payload);
    if (response.status === 200) {
      return {
        success: true,
        payload: response.data,
      };
    }
  } catch (error) {
    throw NewError(error);
  }
};

export const forgotPasswordpHelper = async (payload: TOBE) => {
  try {
    const response = await authService.forgotPassword(payload);
    if (response.status === 200) {
      return {
        success: true,
        payload: response.data,
      };
    }
  } catch (error) {
    throw NewError(error);
  }
};

export const resetPasswordpHelper = async (payload: TOBE) => {
  try {
    const response = await authService.resetPassword(payload);
    if (response.status === 200) {
      return {
        success: true,
        payload: response.data,
      };
    }
  } catch (error) {
    throw NewError(error);
  }
};

export const loginHelper = async (payload: TOBE) => {
  try {
    const response = await authService.login(payload);
    if (response.status === 200) {
      return {
        success: true,
        payload: response.data,
      };
    }
  } catch (error) {
    throw NewError(error);
  }
};
