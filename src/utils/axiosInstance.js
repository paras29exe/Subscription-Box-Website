import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL, // Change this to your actual backend URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable cookies for authentication
});

export default axiosInstance;