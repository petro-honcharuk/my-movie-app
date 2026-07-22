import { Tabs } from "expo-router";
import { Text } from "react-native";

import { useTheme } from "@/src/theme";

export default function TabLayout() {
  const { theme } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        tabBarActiveTintColor: theme.colors.text,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="index" // або назва вашого головного екрана пошуку
        options={{
          title: "Головна",
          // Якщо використовуєте емодзі замість іконок бібліотек:
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20 }}>{focused ? "📽" : "🎥"}</Text>
          ),
        }}
      />

      <Tabs.Screen
        name="setting" // або назва вашого екрана налаштувань всередині табів
        options={{
          title: "Налаштування",
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20 }}>{focused ? "🔩" : "⚙️"}</Text>
          ),
        }}
      />
    </Tabs>
  );
}
