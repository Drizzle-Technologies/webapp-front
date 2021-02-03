import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:5000/api/",
    timeout: 15000,
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

export default api