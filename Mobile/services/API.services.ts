// services/API.services.ts
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = axios.create({
  baseURL: "http://localhost:3000", // backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar token
API.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Error getting token for request:", error);
  }
  return config;
});

// Interceptor para manejar respuestas (opcional)
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Si el token es inválido, elimínalo
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default API;