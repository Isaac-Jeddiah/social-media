import axios from "axios";

export const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`, // Include JWT token

  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
}});
