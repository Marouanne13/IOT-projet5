import axios from "axios";
import { getToken } from "./authApi";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://marouannetika.pythonanywhere.com/api/";

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
