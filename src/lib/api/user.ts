import createApiService from "./apiService";

const userEndpoints = {
  blockManage: {
    method: "put" as const,
    path: "blockUser",
  },
  getAllUser: {
    method: "get" as const,
    path: "getAllUsers",
  },
  instroctorCreate: {
    method: "put" as const,
    path: "createInstructor",
  },
};
 
const userService = createApiService("user", userEndpoints);

export default userService;
