import courseService from "@/lib/api/course";
import { NewError } from "../error/serializeError";

export const codeExcuteHelper = async (payload: any) => {
  try {
    const response = await courseService.codeExcute(payload);
    if (response.status === 201) {
      return {
        success: true,
        payload: response.data,
      };
    }
  } catch (error: any) {
    // console.log(error.response.data.m  essage);

    throw error.response.data.message;
  }
};

export const allProblemsFetchHelper = async (payload: any) => {
  try {
    const response = await courseService.allProblemsFetch(payload);
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

export const submitCourseHelper = async (payload: any) => {
  try {
    const response = await courseService.submitCourse(payload);
    if (response.status === 201) {
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

export const getAllCourseHelper = async (payload?: any) => {
  try {
    const response = await courseService.getAllCourse(payload);
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

export const getCourseeHelper = async (id?: any) => {
  const courseId = id.queryKey[1];
  try {
    const response = await courseService.getCourse({}, { id: courseId });
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

export const codeFetchHelper = async (id: any) => {
  const question = id.queryKey[1];
  const langauge = id.queryKey[2];
  try {
    const response = await courseService.codeFetch({}, { question, langauge });
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
export const publishCourseHelper = async (payload: any) => {
  try {
    const response = await courseService.publishCourse(payload);
    if (response.status === 201) {
      return {
        success: true,
        payload: response.data,
      };
    }
  } catch (error: any) {
    throw NewError(error);
  }
};

export const getAllPublishCoursesHelper = async (payload: any) => {
  try {
    const response = await courseService.getAllPublishedCourses(payload);
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

export const myCourseHelper = async (id?: any) => {
  const courseId = id.queryKey[1];
  try {
    const response = await courseService.myCourse({}, { id: courseId });
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

export const createSubmissionHelper = async (payload: any) => {
  try {
    const response = await courseService.submisson(payload);
    if (response.status === 200 || 201) {
      return {
        success: true,
        payload: response.data,
      };
    }
  } catch (error: any) {
    throw NewError(error);
  }
};

export const getSubmissionsHelper = async (id?: any) => {
  const submissionId = id.queryKey[1];
  try {
    const response = await courseService.getSubmission(
      {},
      { id: submissionId }
    );
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

export const getMySubmissionHelper = async (id?: any) => {
  const submissionId = id.queryKey[1];
  try {
    const response = await courseService.getMySubmission(
      {},
      { id: submissionId }
    );
    if (response.status === 200 || 201) {
      return {
        success: true,
        payload: response.data,
      };
    }
  } catch (error: any) {
    throw NewError(error);
  }
};

export const likeSubmissionHelper = async (payload: any) => {
  try {
    const response = await courseService.manageLike(payload);
    if (response.status === 200 || 201) {
      return {
        success: true,
        payload: response.data,
      };
    }
  } catch (error: any) {
    throw NewError(error);
  }
};

export const dailyTaskHelper = async (payload: any) => {
  try {
    const response = await courseService.assignTask(payload);
    if (response.status === 200 || 201) {
      return {
        success: true,
        payload: response.data,
      };
    }
  } catch (error: any) {
    throw error.response.data.message;
  }
};

export const getTodaysTasksHelper = async (payload: any) => {
  try {
    const response = await courseService.getTodaysTask(payload);
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

export const getMyAttendenceHelper = async (id?: any) => {
  const userId = id.queryKey[1];
  try {
    const response = await courseService.getAttendence({}, { id: userId });
    if (response.status === 200 || 201) {
      return {
        success: true,
        payload: response.data,
      };
    }
  } catch (error: any) {
    throw NewError(error);
  }
};

export const getInstroctorCourseHelper = async (id?: any) => {
  const userId = id.queryKey[1];
  try {
    const response = await courseService.getInstroctorCourse(
      {},
      { id: userId }
    );
    if (response.status === 200 || 201) {
      return {
        success: true,
        payload: response.data,
      };
    }
  } catch (error: any) {
    throw NewError(error);
  }
};
