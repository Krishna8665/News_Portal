import axios from "axios";

// Base Axios instance
const API = axios.create({
  baseURL: "http://localhost:3000", // your backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token if logged in
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
