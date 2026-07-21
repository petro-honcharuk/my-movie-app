import { useMovie } from "@/src/hooks/useMovie";
//import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";
import { Text } from "react-native";
export default function TabLayout() {
  const { theme } = useMovie();
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        tabBarActiveTintColor: theme.text,
        tabBarInactiveTintColor: theme.textMuted,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.border,
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
