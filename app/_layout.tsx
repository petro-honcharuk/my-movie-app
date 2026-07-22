import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: "#0b0d12",
          paddingHorizontal: 16,
          paddingVertical: 12,
        },
        headerStyle: { backgroundColor: "#0b0d12" },
        headerTintColor: "#f4f1ea",
        headerTitleStyle: { color: "#f4f1ea" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Пошук" }} />
      <Stack.Screen
        name="detail"
        options={{
          title: "Деталі",
          contentStyle: {
            backgroundColor: "#0b0d12",
            paddingHorizontal: 0,
            paddingVertical: 0,
          },
        }}
      />
    </Stack>
  );
}
