import chatService from "@/lib/api/chat";
import { NewError } from "../error/serializeError";
import { TOBE } from "@/types/constants/Tobe";

export const getMyMessageHelper = async (id?: TOBE) => {
  const userId = id.queryKey[1];
  try {
    const response = await chatService.getMyMessages({}, { id: userId });
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


export const getMessageHelper = async (id?: TOBE) => {
    const userId = id.queryKey[1];
    try {
      const response = await chatService.getMessages({}, { id: userId });
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



  export const sendNewMessageHelper = async (payload: TOBE) => {
    try {
      const response = await chatService.createMessage(payload);
      if (response.status === 200 || 201) {
        return {
          success: true,
          payload: response.data,
        };
      }
    } catch (error: TOBE) {
      throw NewError(error);
    }
  };
  