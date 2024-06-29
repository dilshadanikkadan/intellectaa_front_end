import createApiService from "./apiService";

const authEndpoints = {
  login: {
    method: "post" as const,
    path: "login",
  },
  signup: {
    method: "post" as const,
    path: "signup",
  },
  logout: {
    method: "post" as const,
    path: "logout",
  },
  verifyOtp: {
    method: "post" as const,
    path: "verifyOtp",
  },
  googleSignup: {
    method: "post" as const,
    path: "googleSignup",
  },
  resentOtp: {
    method: "post" as const,
    path: "resentOtp  ",
  },
  forgotPassword: {
    method: "post" as const,
    path: "forgotPassword  ",
  },
  resetPassword: {
    method: "post" as const,
    path: "resetPassword  ",
  },
  currentuser: {
    method: "post" as const,
    path: "currentUser  ",
  },
  test: {
    method: "get" as const,
    path: "",
  },
};

const authService = createApiService("auth", authEndpoints);

export default authService;
