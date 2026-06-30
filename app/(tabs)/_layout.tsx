import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerTitleAlign: "center" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Головна",
          headerTitle: "Список фільмів",
          tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
        }}
      />

      <Tabs.Screen
        name="setting"
        options={{
          title: "Налаштування",
          headerTitle: "Налаштування",
          tabBarIcon: () => <Feather name="settings" size={24} color="black" />,
        }}
      />
    </Tabs>
  );
}
