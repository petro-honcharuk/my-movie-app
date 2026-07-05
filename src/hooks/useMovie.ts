import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
export const useMovie = () => {
  const context = useContext(MovieContext);
  if (!context) throw new Error("Context error");
  return context;
};
