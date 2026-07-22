import axios from "axios";

export const movieApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

movieApi.interceptors.request.use((config) => {
  config.params = {
    api_key: process.env.EXPO_PUBLIC_API_KEY,
    language: "uk-UA",
    ...config.params,
  };
  return config;
});
