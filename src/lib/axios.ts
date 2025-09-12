import { clearUser } from "@/features/user";
import { store } from "@/store";
import axios from "axios";

const rawBaseURL = "https://hrms-be-mu.vercel.app/";
const baseURL = `${rawBaseURL.replace(/\/$/, "")}/api`;

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// Response interceptor: handle unauthorized
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error?.response?.data?.message === "Not authorized to access this route"
    ) {
      localStorage.removeItem("token");
      store.dispatch(clearUser());
      // optional: force redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
