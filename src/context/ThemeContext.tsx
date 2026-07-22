import AsyncStorage from "@react-native-async-storage/async-storage";
import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";
import { createContext, useEffect, useState } from "react";
import { themes } from "../Colors/colors";
interface ThemeContextType {
  isDarkMode: boolean;
  theme: typeof themes.light;
  toggleTheme: () => void;
}
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const AppThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = async () => {
    const newValue = !isDarkMode;
    setIsDarkMode(newValue);
    await AsyncStorage.setItem("userTheme", newValue ? "dark" : "light");
  };
  const theme = isDarkMode ? themes.dark : themes.light;
  useEffect(() => {
    const loadingTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("userTheme");
        if (savedTheme === "dark") {
          setIsDarkMode(true);
        }
      } catch (e) {
        console.error("Помилка завантаження фільмів", e);
      }
    };
    loadingTheme();
  }, []);
  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const navigationLightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#cac0b8", // ваш колір фону
    card: "#cac0b8", // колір верхньої панелі (Header)
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
