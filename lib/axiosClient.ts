import axios, { AxiosResponse } from "axios";

const axiosServices = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 50000,
});

axiosServices.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosServices.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (err) => {
    return Promise.reject(err);
  }
);

axiosServices.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const axiosUpload = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 50000,
});

axiosUpload.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "multipart/form-data";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const axiosClientUpload = axiosUpload;

export default axiosServices;
