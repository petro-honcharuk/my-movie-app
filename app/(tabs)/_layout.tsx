import { useTheme } from "@/src/hooks/useTheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        marginTop: insets.top,
        backgroundColor: theme.background,
      }}
    >
      <Tabs
        screenOptions={{
          headerTitleAlign: "center",
          tabBarActiveTintColor: "#b89d17",
          tabBarInactiveTintColor: "#6d6969",
          tabBarStyle: {
            backgroundColor: theme.background,
            borderTopColor: theme.border,
            borderBottomWidth: 0,
          },
        }}
      >
        <Tabs.Screen
          name="index" // або назва вашого головного екрана пошуку
          options={{
            title: "Головна",
            headerShown: false,
            tabBarIcon: () => (
              <AntDesign name="home" size={24} color="#b89d17" />
            ),
          }}
        />

        <Tabs.Screen
          name="search" // або назва вашого головного екрана пошуку
          options={{
            title: "Пошук",
            headerShown: false,
            tabBarIcon: () => (
              <FontAwesome name="search" size={24} color="#b89d17" />
            ),
          }}
        />

        <Tabs.Screen
          name="list" // або назва вашого екрана налаштувань всередині табів
          options={{
            title: "Список фільмів",
            headerShown: false,
            tabBarIcon: () => (
              <MaterialIcons name="list-alt" size={24} color="#b89d17" />
            ),
          }}
        />
        <Tabs.Screen
          name="profile" // або назва вашого головного екрана пошуку
          options={{
            title: "Профіль",
            headerShown: false,
            tabBarIcon: () => (
              <Ionicons name="person" size={24} color="#b89d17" />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
