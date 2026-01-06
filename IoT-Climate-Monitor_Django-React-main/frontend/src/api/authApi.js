import { axiosInstance } from "./axiosInstance";
import { saveToken } from "./sensorApi";

export async function loginUser(credentials) {
  const res = await axiosInstance.post("auth/login/", credentials);
  saveToken(res.data.access);
  return res.data;
}

export async function registerUser(data) {
  const res = await axiosInstance.post("auth/register/", data);
  return res.data;
}

export async function fetchCurrentUser() {
  const res = await axiosInstance.get("auth/me/");
  return res.data;
}

export function logout() {
  localStorage.clear();
}
