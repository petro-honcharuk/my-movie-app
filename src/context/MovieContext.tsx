import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

import { Film } from "../types/types";

interface MovieContextType {
  favorites: string[];
  toggleFavorites: (id: string) => void;
  addFilm: (film: Film) => void;
  allFilms: Film[];
}
export const MovieContext = createContext<MovieContextType | undefined>(
  undefined,
);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [allFilms, setAllFilms] = useState<Film[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const saveFilms = async () => {
      try {
        if (isLoaded === false) return;
        const jsonValue = JSON.stringify(allFilms);
        await AsyncStorage.setItem("my_films", jsonValue);
      } catch (e) {
        console.log("Помилка збереження данних", e);
      }
    };
    saveFilms();
  }, [allFilms, isLoaded]);

  useEffect(() => {
    const loadedFilms = async () => {
      try {
        const savedFilms = await AsyncStorage.getItem("my_films");
        if (savedFilms !== null) {
          setAllFilms(JSON.parse(savedFilms));
          setIsLoaded(true);
        }
      } catch (e) {
        console.log("Помилка при завантаженні данних", e);
      }
    };
    loadedFilms();
  }, []);

  const addFilm = (film: Film) => {
    setAllFilms([...allFilms, film]);
  };

  const toggleFavorites = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((item) => item !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };
  return (
    <MovieContext.Provider
      value={{ favorites, toggleFavorites, addFilm, allFilms }}
    >
      {children}
    </MovieContext.Provider>
  );
};
