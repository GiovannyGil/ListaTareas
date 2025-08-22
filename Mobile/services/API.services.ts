// api.ts
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // tu backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // o donde lo guardes
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
