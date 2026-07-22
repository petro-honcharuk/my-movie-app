import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { themes, ThemeName, AppTheme } from "./variants";
import { StyleSheet } from "react-native";

const THEME_STORAGE_KEY = "userTheme";

type ThemeContextValue = {
  themeName: ThemeName;
  theme: AppTheme;
  setTheme: (name: ThemeName) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>("light");

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const themeName = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        setThemeName((themeName as ThemeName) || "light");
      } catch (e) {
        console.error("[Theme Provider] Error loading theme", e);
      }
    };
    loadTheme();
  }, []);

  const setTheme = async (name: ThemeName) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, name);
      setThemeName(name);
    } catch (e) {
      console.error("[Theme Provider] Error saving theme", e);
    }
  };

  const toggleTheme = () => {
    setTheme(themeName === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider
      value={{
        themeName,
        theme: themes[themeName],
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme має використовуватися всередині ThemeProvider");
  }
  return context;
}

type StylesFactory<T> = (theme: AppTheme) => T;

export function createStyles<T extends StyleSheet.NamedStyles<T>>(
  factory: StylesFactory<T>,
): StylesFactory<T> {
  return factory;
}

export function useStyles<T extends StyleSheet.NamedStyles<T>>(
  factory: StylesFactory<T>,
) {
  const { theme } = useTheme();

  const styles = useMemo(
    () => StyleSheet.create(factory(theme)),
    [factory, theme],
  );

  return { styles, theme };
}
