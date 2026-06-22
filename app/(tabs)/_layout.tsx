import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerTitleAlign: "center" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Фільми",
          headerTitle: "Список фільмів",
          tabBarIcon: () => (
            <FontAwesome name="file-movie-o" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Улюблені",
          headerTitle: "Улюблені фільми",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="movie-open-star"
              size={24}
              color="black"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "Переглянуті",
          headerTitle: "Налаштування",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="movie-open-check"
              size={24}
              color="black"
            />
          ),
        }}
      />
      <Tabs.Screen name="DetailsScreen" options={{ href: null }} />
    </Tabs>
  );
}
