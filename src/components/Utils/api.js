import axios from "axios";
import { BASE_URL } from "./constants";

export const PlatformApi = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
    'Authorization': `Bearer ${localStorage.getItem("TOKEN")}`
  },
});


PlatformApi.interceptors.request.use(function (config) {
  const token = localStorage.getItem("TOKEN");
  config.headers.Authorization =  `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(function (config) {
  const token = localStorage.getItem("TOKEN");
  config.headers.Authorization =  `Bearer ${token}`;
  return config;
});