import axios from "axios";

const rawBaseURL ="https://hrms-be-mu.vercel.app/";
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

export default axiosInstance;
