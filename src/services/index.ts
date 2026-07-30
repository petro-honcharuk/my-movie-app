import axios from "axios";

export const movieApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  params: {
    api_key: process.env.EXPO_PUBLIC_API_KEY,
    language: "uk-UA",
  },
});
