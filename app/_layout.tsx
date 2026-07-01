import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="search" options={{ headerTitleAlign: "center" }} />
      <Stack.Screen name="movieGrid" options={{ headerTitleAlign: "center" }} />
    </Stack>
  );
}
