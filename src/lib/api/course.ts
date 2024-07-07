import createApiService from "./apiService";

const courseEndpoints = {
  codeExcute: {
    method: "post" as const,
    path: "codeExcute",
  },
  codeFetch: {
    method: "get" as const,
    path: "getFile/:question/:langauge",
  },
  allProblemsFetch: {
    method: "get" as const,
    path: "getAllQuestion",
  },
  submitCourse: {
    method: "post" as const,
    path: "addCourse",
  },
  getAllCourse: {
    method: "get" as const,
    path: "getAllCourses",
  },
  getCourse: {
    method: "get" as const,
    path: "courses/:id",
  },
  publishCourse: {
    method: "post" as const,
    path: "publish",
  },
  getAllPublishedCourses: {
    method: "get" as const,
    path: "getAllPublishedCourses",
  },
  myCourse: {
    method: "get" as const,
    path: "getMyCourse/:id",
  },
};

const courseService = createApiService("course", courseEndpoints);

export default courseService;

