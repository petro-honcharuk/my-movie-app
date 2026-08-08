import { AppTheme } from "@/src/Colors/colors";
import { useTheme } from "@/src/hooks/useTheme";
import { supabase } from "@/src/services/supabase";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Setting() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [userName, setUserName] = useState("Киноман");

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.user_metadata?.display_name) {
        setUserName(user.user_metadata.display_name);
      }
    };
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error(e);
      Alert.alert("Помилка", "Не вдалося вийти з акаунта");
    }
  };
  const confirmSignOut = () => {
    Alert.alert(
      "Вихід з акаунта",
      "Ви впевнені, що хочете вийти з вашого кінощоденника?",
      [
        { text: "Скасувати", style: "cancel" },
        { text: "Вийти", style: "destructive", onPress: handleSignOut }, // Якщо тисне "Вийти" — запускаємо handleSignOut
      ],
    );
  };

  return (
    <View style={styles.main}>
      <View style={styles.userPath}>
        <View style={styles.userContainer}>
          <View style={styles.avatar}></View>
          <Text style={styles.textName}>{userName}</Text>
        </View>
        <TouchableOpacity style={styles.btnOut} onPress={confirmSignOut}>
          <Text style={styles.btnOutText}>Вийти</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.block}
        onPress={() => router.push("/statistic")}
      >
        <View style={styles.image}>
          <Text style={styles.settingText}>📊 Статистика кіномана </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.block}
        onPress={() => router.push("/setting")}
      >
        <View style={styles.image}>
          <Text style={styles.settingText}>🔩 Керування додатком</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.block}
        onPress={() => router.push("/about")}
      >
        <View style={styles.image}>
          <Text style={styles.settingText}>🙊 Про програму</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: theme.background,
    },
    userPath: {
      flexDirection: "row",
      marginTop: 5,
      marginHorizontal: 10,
    },
    userContainer: {
      marginLeft: 30,
      padding: 5,
    },
    avatar: {
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: "white",
    },
    textName: {
      color: theme.text,
      fontSize: 16,
      fontWeight: "bold",
      alignSelf: "center",
      marginTop: 10,
    },
    btnOut: {
      position: "absolute",
      top: 0,
      right: 0,
      width: 50,
      height: 30,
      backgroundColor: "#285090",
      borderWidth: 1,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
      marginTop: 5,
    },
    btnOutText: {
      color: "white",
      fontSize: 12,
    },
    block: {
      height: 50,
      marginVertical: 20,
      marginHorizontal: 10,
      backgroundColor: theme.cardBackground,
      borderBottomColor: theme.border,
      borderRadius: 8,
    },
    settingText: {
      fontSize: 20,
      color: theme.text,
    },
    image: {
      height: "100%",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
  });
