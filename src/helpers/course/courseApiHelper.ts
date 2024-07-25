import courseService from "@/lib/api/course";
import { NewError } from "../error/serializeError";
import axios from "axios";
import { baseApi_ } from "@/lib/api/buildClient/buildClient";
import { TOBE } from "@/types/constants/Tobe";

export const codeExcuteHelper = async (payload: TOBE) => {
  try {
    const response = await courseService.codeExcute(payload);
    if (response.status === 201) {
      return {
        success: true,
        payload: response.data,
      };
    }
  } catch (error: TOBE) {
    // console.log(error.response.data.m  essage);

    throw error.response.data.message;
  }
};

export const allProblemsFetchHelper = async (payload: TOBE) => {
  try {
    const response = await courseService.allProblemsFetch(payload);
    if (response.status === 200) {
      return {
        success: true,
        payload: response.data,
      };
    }
  } catch (error: TOBE) {
    console.log(error.response.data.message);

    throw NewError(error);
  }
};

export const submitCourseHelper = async (payload: TOBE) => {
  try {
    const response = await courseService.submitCourse(payload);
    if (response.status === 201) {
      return {
        success: true,
        payload: response.data,
      };
    }
  } catch (error: TOBE) {
    console.log(error.response.data.message);

    throw NewError(error);
  }
};

export const getAllCourseHelper = async (pageNumber: number, limit: number) => {
  try {
    const response = await axios.get(
      `${baseApi_}course/getAllCourses?_limit=${limit}&_page=${pageNumber}`
    );
    if (response.status === 200) {
      return {
        success: true,
        payload: response.data.courses,
        totalCount: response.data.totalCount,
      };
    }
  } catch (error: TOBE) {
    console.log(error.response.data.message);

    throw NewError(error);
  }
};

export const getCourseeHelper = async (id?: TOBE) => {
  const courseId = id.queryKey[1];
  try {
    const response = await courseService.getCourse({}, { id: courseId });
    if (response.status === 200) {
      return {
        success: true,
        payload: response.data,
      };
    }
  } catch (error: TOBE) {
    console.log(error.response.data.message);

    throw NewError(error);
  }
};

export const codeFetchHelper = async (id: TOBE) => {
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
  } catch (error: TOBE) {
    console.log(error.response.data.message);

    throw NewError(error);
  }
};
export const publishCourseHelper = async (payload: TOBE) => {
  try {
    const response = await courseService.publishCourse(payload);
    if (response.status === 201) {
      return {
        success: true,
        payload: response.data,
      };
    }
  } catch (error: TOBE) {
    throw NewError(error);
  }
};

export const getAllPublishCoursesHelper = async (
  searchQuery?: TOBE,
  category?: TOBE,
  pageNumber?: TOBE,
  limit?: TOBE,
  language?: TOBE
) => {
  try {
    const response = await axios.get(
      `${baseApi_}course/getAllPublishedCourses?_search=${searchQuery}&&_Category=${category}&&_limit=${limit}&_page=${pageNumber}&&language=${language}`,
      {
        withCredentials: true,
      }
    );
    // const response = await courseService.getAllPublishedCourses(searchQuery);
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

export const myCourseHelper = async (id?: TOBE) => {
  const courseId = id.queryKey[1];
  try {
    const response = await courseService.myCourse({}, { id: courseId });
    if (response.status === 200) {
      return {
        success: true,
        payload: response.data,
      };
    }
  } catch (error: TOBE) {
    console.log(error.response.data.message);

    throw NewError(error);
  }
};

export const createSubmissionHelper = async (payload: TOBE) => {
  try {
    const response = await courseService.submisson(payload);
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

export const getSubmissionsHelper = async (id?: TOBE) => {
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
  } catch (error: TOBE) {
    console.log(error.response.data.message);

    throw NewError(error);
  }
};

export const getMySubmissionHelper = async (id?: TOBE) => {
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
  } catch (error: TOBE) {
    throw NewError(error);
  }
};

export const likeSubmissionHelper = async (payload: TOBE) => {
  try {
    const response = await courseService.manageLike(payload);
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

export const dailyTaskHelper = async (payload: TOBE) => {
  try {
    const response = await courseService.assignTask(payload);
    if (response.status === 200 || 201) {
      return {
        success: true,
        payload: response.data,
      };
    }
  } catch (error: TOBE) {
    throw error.response.data.message;
  }
};

export const getTodaysTasksHelper = async (payload: TOBE) => {
  try {
    const response = await courseService.getTodaysTask(payload);
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

export const getMyAttendenceHelper = async (id?: TOBE) => {
  const userId = id.queryKey[1];
  try {
    const response = await courseService.getAttendence({}, { id: userId });
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

export const getInstroctorCourseHelper = async (id?: TOBE) => {
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
  } catch (error: TOBE) {
    throw NewError(error);
  }
};

export const updateCourseHelper = async (payload: TOBE) => {
  try {
    const response = await courseService.updateCourse(payload);
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

export const rejectCourseHelper = async (payload: TOBE) => {
  try {
    const response = await courseService.rejectCourse(payload);
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

export const updateProgressCourseHelper = async (payload: TOBE) => {
  try {
    const response = await courseService.updateProgressCourse(payload);
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

export const getMyEntrollHelper = async (id?: TOBE) => {
  const userId = id.queryKey[1];
  try {
    const response = await courseService.getMyEntroll({}, { id: userId });
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

export const getMySubmittedQuestionHelper = async (id?: TOBE) => {
  const userId = id.queryKey[1];
  try {
    const response = await courseService.getMySubmittedQuestion(
      {},
      { id: userId }
    );
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

export const deleteCourseHelper = async (id: TOBE) => {
  console.log("_________deletting");

  try {
    const response = await courseService.deleteCourse(id);
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

export const getLeaderBoardHelper = async (id?: TOBE) => {
  try {
    const response = await courseService.getLeaderBoard({}, {});
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

export const getEntrollAnalatytics = async (payload?: TOBE) => {
  console.log();

  try {
    const response = await courseService.getEntrollAnalatytics();

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

export const getInstructorOwnAnalytics = async (userId?: TOBE) => {
  console.log();

  try {
    const response = await courseService.getInstructorOwnAnalytics(
      {},
      { id: userId }
    );

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

export const getAllCategoryHelper = async (id?: TOBE) => {
  try {
    const response = await courseService.getAllCategory({}, {});
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
export const deleteCategoryHelper = async (payload?: TOBE) => {
  try {
    const response = await courseService.deleteCategory({}, { id: payload.id });
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
export const addCategoryHelper = async (payload?: TOBE) => {
  try {
    const response = await courseService.addCategory(payload);
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

export const updateCategoryHelper = async (payload?: TOBE) => {
  try {
    const response = await courseService.updateCategory(payload);
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

export const getInstructorTrendCourse = async (id?: TOBE) => {
  try {
    const response = await courseService.getInstructorTrendCourse({}, { id });
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
