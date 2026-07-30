import { AppTheme } from "@/src/Colors/colors";
import { useTheme } from "@/src/hooks/useTheme";
import { supabase } from "@/src/services/supabase";
import { useRouter } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Setting() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = getStyles(theme);
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
      <TouchableOpacity style={styles.btnOut} onPress={confirmSignOut}>
        <Text style={styles.btnOutText}>Вийти</Text>
      </TouchableOpacity>
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
    btnOut: {
      alignSelf: "flex-end",
      width: 70,
      height: 40,
      backgroundColor: "#285090",
      borderWidth: 1,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 20,
      marginTop: 10,
    },
    btnOutText: {
      color: "white",
      fontSize: 16,
    },
    block: {
      height: 90,
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
