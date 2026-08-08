import AsyncStorage from "@react-native-async-storage/async-storage";

import { createContext, useEffect, useState } from "react";

import { UserMovie } from "../types/UserMovie";

interface MovieContextType {
  favorites: UserMovie[];
  isWatched: UserMovie[];
  isWantToWatch: UserMovie[];
  toggleFavorites: (film: UserMovie) => void;
  toggleWantToWatch: (film: UserMovie) => void;
  toggleWatched: (film: UserMovie) => void;
  clearAllMovies: () => void;
}
export const MovieContext = createContext<MovieContextType | undefined>(
  undefined,
);

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<UserMovie[]>([]);
  const [isWantToWatch, setIsWantToWatch] = useState<UserMovie[]>([]);
  const [isWatched, setIsWatched] = useState<UserMovie[]>([]);

  useEffect(() => {
    const loadingFilms = async () => {
      try {
        const savedFilms = await AsyncStorage.getItem("my_favorites");
        const savedWantToWatch = await AsyncStorage.getItem("my_want_to_watch");
        const saveWatched = await AsyncStorage.getItem("my_watched_films");

        if (savedFilms) setFavorites(JSON.parse(savedFilms));
        if (savedWantToWatch) setIsWantToWatch(JSON.parse(savedWantToWatch));
        if (saveWatched) setIsWatched(JSON.parse(saveWatched));
      } catch (e) {
        console.error("Помилка завантаження фільмів", e);
      }
    };
    loadingFilms();
  }, []);

  const clearAllMovies = async () => {
    try {
      await AsyncStorage.removeItem("my_favorites");
      await AsyncStorage.removeItem("my_want_to_watch");
      await AsyncStorage.removeItem("my_watched_films");
      setFavorites([]);
      setIsWantToWatch([]);
      setIsWatched([]);
    } catch (e) {
      console.log("Помилка при очищені сховища", e);
    }
  };

  const toggleFavorites = async (film: UserMovie) => {
    // 1. Шукаємо по ID, чи є фільм у списку
    const isExist = favorites.some((item) => item.id === film.id);

    // 2. Формуємо новий масив залежно від результату
    const updatedFavorites = isExist
      ? favorites.filter((item) => item.id !== film.id) // видаляємо
      : [...favorites, film]; // додаємо

    // 3. Оновлюємо стан на екрані
    setFavorites(updatedFavorites);

    // 4. Одразу ж надійно зберігаємо в пам'ять телефону
    try {
      await AsyncStorage.setItem(
        "my_favorites",
        JSON.stringify(updatedFavorites),
      );
    } catch (e) {
      console.log("Помилка збереження улюблених фільмів", e);
    }
  };
  const toggleWantToWatch = async (film: UserMovie) => {
    const isExist = isWantToWatch.some((item) => item.id === film.id);
    const updateWantToWatch = isExist
      ? isWantToWatch.filter((item) => item.id !== film.id)
      : [...isWantToWatch, film];
    setIsWantToWatch(updateWantToWatch);
    try {
      await AsyncStorage.setItem(
        "my_want_to_watch",
        JSON.stringify(updateWantToWatch),
      );
    } catch (e) {
      console.log("Помилка збереження фільмів для перегляду", e);
    }
  };
  const toggleWatched = async (film: UserMovie) => {
    const isExist = isWatched.some((item) => item.id === film.id);
    const updateIsWatched = isExist
      ? isWatched.filter((item) => item.id !== film.id)
      : [...isWatched, film];
    setIsWatched(updateIsWatched);
    try {
      await AsyncStorage.setItem(
        "my_watched_films",
        JSON.stringify(updateIsWatched),
      );
    } catch (e) {
      console.log("Помилка при збережені переглянутих фільмів", e);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        favorites,
        isWantToWatch,
        isWatched,
        toggleFavorites,
        toggleWantToWatch,
        toggleWatched,
        clearAllMovies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
