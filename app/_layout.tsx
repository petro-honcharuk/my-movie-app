import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="search"
        options={{ headerTitleAlign: "center", title: "Пошук" }}
      />
      <Stack.Screen name="movieGrid" options={{ headerTitleAlign: "center" }} />
      <Stack.Screen
        name="detailsScreen"
        options={{ headerTitleAlign: "center", title: "Деталі фільму" }}
      />
    </Stack>
  );
}
