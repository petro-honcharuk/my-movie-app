import { MovieProvider } from "@/src/context/MovieContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <MovieProvider>
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
    </MovieProvider>
  );
}
