import axios from "axios"

import { RemoveAuth } from "./Auth"

export const api = axios.create({
    baseURL: "http://localhost:5000/api/",
    timeout: 15000,
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

api.interceptors.response.use((response) => response, (error) => {

  if(error.response && error.response.status === 401){
    RemoveAuth();
  }

  return Promise.reject(error);
});

export default api