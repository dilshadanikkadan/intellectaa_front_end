import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { buildClient } from "./buildClient/buildClient";

  type Method = "get" | "post" | "put" | "delete";

type Endpoint = {
  method: Method;
  path: string;
};

type Endpoints = Record<string, Endpoint>;

const createApiService = <T extends Endpoints>(serviceName: string, endpoints: T) => {
  const client: AxiosInstance = buildClient();
  const service: {
    [K in keyof T]: (
      data?: any,
      pathParams?: Record<string, string>,
      config?: AxiosRequestConfig
    ) => Promise<AxiosResponse<any>>;
  } = {} as any;

  Object.entries(endpoints).forEach(([methodName, { method, path }]) => {
    service[methodName as keyof T] = async (data?: any, pathParams?: Record<string, string>, config: AxiosRequestConfig = {}) => {
      let url = `${serviceName}/${path}`;

      if (pathParams) {
        Object.entries(pathParams).forEach(([key, value]) => {
          url = url.replace(`:${key}`, encodeURIComponent(value));
        });
      }

      switch (method) {
        case "post":
          return client.post(url, data, config);
        case "get":
          return client.get(url, { ...config, params: data });
        case "put":
          return client.put(url, data, config);
        case "delete":
          return client.delete(url, { ...config, data });
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
    };
  });

  return service;
};

export default createApiService;
