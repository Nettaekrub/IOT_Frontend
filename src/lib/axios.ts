import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://54.79.48.228:3000",
});

export default api;