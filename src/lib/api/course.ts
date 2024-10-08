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
  submisson: {
    method: "post" as const,
    path: "addSubmission",
  },
  getSubmission: {
    method: "get" as const,
    path: "getSubmission/:id",
  },
  getMySubmission: {
    method: "get" as const,
    path: "getMySubmission/:id",
  },
  getMySubmittedQuestion: {
    method: "get" as const,
    path: "myAllSumbittedProblems/:id",
  },
  getMyEntroll: {
    method: "get" as const,
    path: "myEntrolledCourse/:id",
  },
  manageLike: {
    method: "post" as const,
    path: "like",
  },
  assignTask: {
    method: "post" as const,
    path: "addtask",
  },
  getTodaysTask: {
    method: "get" as const,
    path: "getTodayTask",
  },
  getAttendence: {
    method: "get" as const,
    path: "getAttendence/:id",
  },

  getInstroctorCourse: {
    method: "get" as const,
    path: "getInstroctorCourse/:id",
  },
  deleteCourse: {
    method: "post" as const,
    path: "deleteCourse",
  },
  updateCourse: {
    method: "post" as const,
    path: "updateCourse",
  },
  rejectCourse: {
    method: "post" as const,
    path: "rejectCourse",
  },
  updateProgressCourse: {
    method: "post" as const,
    path: "updateProgress",
  },
  getLeaderBoard: {
    method: "get" as const,
    path: "leaderBoard",
  },
  getEntrollAnalatytics: {
    method: "get" as const,
    path: "getEntrollAnalatytics",
  },
  getInstructorOwnAnalytics: {
    method: "get" as const,
    path: "getInstructorOwnAnalytics/:id",
  },
  addCategory: {
    method: "post" as const,
    path: "category",
  },
  getAllCategory: {
    method: "get" as const,
    path: "category",
  },
  updateCategory: {
    method: "put" as const,
    path: "category",
  },
  deleteCategory: {
    method: "delete" as const,
    path: "category/:id",
  },
  getInstructorTrendCourse: {
    method: "get" as const,
    path: "getInstructorTrendCourse/:id",
  },
  getMylikes: {
    method: "get" as const,
    path: "getMylikes/:id",
  },
  getTrendingCourses: {
    method: "get" as const,
    path: "getTrendingCourses",
  },
};

const courseService = createApiService("course", courseEndpoints);

export default courseService;
