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
  userProfilePatch: {
    method: "put" as const,
    path: "updateProfile",
  },
};
 
const userService = createApiService("user", userEndpoints);

export default userService;
