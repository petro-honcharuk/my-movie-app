import { Stack } from "expo-router";

import { ThemeProvider } from "@/src/theme/index";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, headerTitleAlign: "center" }}
        />
        <Stack.Screen name="search" options={{ title: "Пошук" }} />
        {/* <Stack.Screen name="movieGrid" options={{ title: "Фільми" }} />
        <Stack.Screen
          name="detailsScreen"
          options={{ title: "Деталі фільму" }}
        />
        <Stack.Screen
          name="statisticScreen"
          options={{
            title: "Статистика користувача",
          }}
        />
        <Stack.Screen
          name="settingScreen"
          options={{ title: "Налаштування" }}
        />
        <Stack.Screen name="aboutScreen" options={{ title: "Про програму" }} /> */}
      </Stack>
    </ThemeProvider>
  );
}
