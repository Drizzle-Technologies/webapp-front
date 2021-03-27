import axios from "axios";

import { RemoveAuth } from "./Auth";

export const api = axios.create({
  baseURL: "http://localhost:5000/api/",
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      console.log("refreshToken", refreshToken);
      api
        .post("/refresh", { refreshToken: refreshToken })
        .then((res) => {
          if (res.data) {
            const { accessToken, refreshToken } = res.data;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            api.defaults.headers["Authorization"] =
              "Bearer " + accessToken;
            originalRequest.headers["Authorization"] =
              "Bearer " + accessToken;

            return api(originalRequest);
          }
        })
        .catch((err) => {
          if (
            err.response &&
            (err.response.status === 400 || err.response.status === 404)
          ) {
            RemoveAuth();
          }
        });
    }

    return Promise.reject(error);
  }
);

export default api;
