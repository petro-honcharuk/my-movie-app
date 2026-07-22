import { MovieProvider } from "@/src/context/MovieContext";
import {
  AppThemeProvider,
  navigationDarkTheme,
  navigationLightTheme,
} from "@/src/context/ThemeContext";
import { useTheme } from "@/src/hooks/useTheme";
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

// 1. ГОЛОВНИЙ КОМПОНЕНТ (Він лише ініціалізує контекст і не використовує хуки зверху)
export default function RootLayout() {
  return (
    <AppThemeProvider>
      <MovieProvider>
        <AppNavigationContent />
      </MovieProvider>
    </AppThemeProvider>
  );
}

// 2. ВНУТРІШНІЙ КОМПОНЕНТ (Тепер він всередині MovieProvider і хук useMovie працюватиме ідеально!)
function AppNavigationContent() {
  const { isDarkMode } = useTheme();

  const currentNavigationTheme = isDarkMode
    ? navigationDarkTheme
    : navigationLightTheme;

  return (
    <ThemeProvider value={currentNavigationTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="search"
          options={{ headerTitleAlign: "center", title: "Пошук" }}
        />
        <Stack.Screen
          name="movie_grid"
          options={{ headerTitleAlign: "center", title: "Фільми" }}
        />
        <Stack.Screen
          name="details"
          options={{ headerTitleAlign: "center", title: "Деталі фільму" }}
        />
        <Stack.Screen
          name="statistic"
          options={{
            headerTitleAlign: "center",
            title: "Статистика користувача",
          }}
        />
        <Stack.Screen
          name="setting"
          options={{ headerTitleAlign: "center", title: "Налаштування" }}
        />
        <Stack.Screen
          name="about"
          options={{ headerTitleAlign: "center", title: "Про програму" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
