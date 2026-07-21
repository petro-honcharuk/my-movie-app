import AsyncStorage from "@react-native-async-storage/async-storage";
import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";
import { createContext, useEffect, useState } from "react";
import { themes } from "../Colors/colors";
import { UserMovie } from "../types/UserMovie";

interface MovieContextType {
  favorites: UserMovie[];
  isWatched: UserMovie[];
  isWantToWatch: UserMovie[];
  toggleFavorites: (film: UserMovie) => void;
  toggleWantToWatch: (film: UserMovie) => void;
  toggleWatched: (film: UserMovie) => void;
  isDarkMode: boolean;
  theme: typeof themes.light;
  toggleTheme: () => void;
}
export const MovieContext = createContext<MovieContextType | undefined>(
  undefined,
);

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<UserMovie[]>([]);
  const [isWantToWatch, setIsWantToWatch] = useState<UserMovie[]>([]);
  const [isWatched, setIsWatched] = useState<UserMovie[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = async () => {
    const newValue = !isDarkMode;
    setIsDarkMode(newValue);
    await AsyncStorage.setItem("userTheme", newValue ? "dark" : "ligth");
  };
  const theme = isDarkMode ? themes.dark : themes.light;

  useEffect(() => {
    const loadingFilms = async () => {
      try {
        const savedFilms = await AsyncStorage.getItem("my_favorites");
        const savedWantToWatch = await AsyncStorage.getItem("my_want_to_watch");
        const saveWatched = await AsyncStorage.getItem("my_watched_films");
        const savedTheme = await AsyncStorage.getItem("userTheme");
        if (savedTheme === "dark") {
          setIsDarkMode(true);
        }
        if (savedFilms) setFavorites(JSON.parse(savedFilms));
        if (savedWantToWatch) setIsWantToWatch(JSON.parse(savedWantToWatch));
        if (saveWatched) setIsWatched(JSON.parse(saveWatched));
      } catch (e) {
        console.log("Помилка завантаження фільмів", e);
      }
    };
    loadingFilms();
  }, []);

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
        isDarkMode,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
export const navigationLightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#f8f9fa", // ваш колір фону
    card: "#ffffff", // колір верхньої панелі (Header)
    text: "#1c1c1e", // колір тексту в заголовку
    border: "#ececec", // лінія під Header
    primary: "#1b7abd", // колір активних кнопок/вкладок
  },
};

// Модифікуємо темну тему навігації під ваші кольори
export const navigationDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#243147", // ваш темний фон
    card: "#243147", // темний Header
    text: "#ffffff", // білий текст заголовку
    border: "#263143", // темна лінія під Header
    primary: "#1b7abd",
  },
};
