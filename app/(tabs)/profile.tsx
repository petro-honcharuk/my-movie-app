import { AppTheme } from "@/src/Colors/colors";
import { useTheme } from "@/src/hooks/useTheme";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Setting() {
  const router = useRouter();
  const { theme, isDarkMode } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.main}>
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
