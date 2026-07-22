import axios from "axios";

export const movieApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

movieApi.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: process.env.EXPO_PUBLIC_API_KEY,
  };
  return config;
});
