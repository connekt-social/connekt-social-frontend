import axios, { AxiosError } from "axios";
import { toast } from "./toast";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export type DefaultApiError = {
  message?: string;
};

apiClient.interceptors.response.use(
  undefined,
  (error: AxiosError<DefaultApiError>) => {
    if (error.response?.status === 401) {
      toast({
        message: "Session expired, please login again",
        severity: "warning",
      });
      window.location.href = "/login";
    } else {
      toast({
        message: error.response?.data?.message ?? error.message,
        severity: "error",
      });
    }

    return Promise.reject(error);
  }
);

export default apiClient;
