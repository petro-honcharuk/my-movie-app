import {
  MovieProvider,
  navigationDarkTheme,
  navigationLightTheme,
} from "@/src/context/MovieContext";
import { useMovie } from "@/src/hooks/useMovie";
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

// 1. ГОЛОВНИЙ КОМПОНЕНТ (Він лише ініціалізує контекст і не використовує хуки зверху)
export default function RootLayout() {
  return (
    <MovieProvider>
      <AppNavigationContent />
    </MovieProvider>
  );
}

// 2. ВНУТРІШНІЙ КОМПОНЕНТ (Тепер він всередині MovieProvider і хук useMovie працюватиме ідеально!)
function AppNavigationContent() {
  const { isDarkMode } = useMovie();

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
          name="movieGrid"
          options={{ headerTitleAlign: "center", title: "Фільми" }}
        />
        <Stack.Screen
          name="detailsScreen"
          options={{ headerTitleAlign: "center", title: "Деталі фільму" }}
        />
        <Stack.Screen
          name="statisticScreen"
          options={{
            headerTitleAlign: "center",
            title: "Статистика користувача",
          }}
        />
        <Stack.Screen
          name="settingScreen"
          options={{ headerTitleAlign: "center", title: "Налаштування" }}
        />
        <Stack.Screen
          name="aboutScreen"
          options={{ headerTitleAlign: "center", title: "Про програму" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
