import createApiService from "./apiService";

const chatEndpoints = {
  getMyMessages: {
    method: "get" as const,
    path: "getMymessages/:id",
  },

  getMessages: {
    method: "get" as const,
    path: "getMessages/:id",
  },

  createMessage: {
    method: "post" as const,
    path: "createMessage",
  },
};

const chatService = createApiService("chat", chatEndpoints);

export default chatService;
