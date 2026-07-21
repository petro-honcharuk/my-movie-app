import { AppTheme } from "@/src/Colors/colors";
import { useMovie } from "@/src/hooks/useMovie";
import { useRouter } from "expo-router";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Setting() {
  const router = useRouter();
  const { theme, isDarkMode } = useMovie();
  const styles = getStyles(theme);
  const requireImage = isDarkMode
    ? require("@/assets/images/fonSetting.jpg")
    : require("@/assets/images/fonStatistic2.jpg");
  return (
    <View style={styles.main}>
      <TouchableOpacity
        style={styles.block}
        onPress={() => router.push("/statisticScreen")}
      >
        <ImageBackground
          source={requireImage}
          style={styles.image}
          imageStyle={{ borderRadius: 8 }}
        >
          <Text style={styles.settingText}>📊 Статистика кіномана </Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.block}
        onPress={() => router.push("/settingScreen")}
      >
        <ImageBackground
          source={requireImage}
          style={styles.image}
          imageStyle={{ borderRadius: 8 }}
        >
          <Text style={styles.settingText}>🔩 Керування додатком</Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.block}
        onPress={() => router.push("/aboutScreen")}
      >
        <ImageBackground
          source={requireImage}
          style={styles.image}
          imageStyle={{ borderRadius: 8 }}
        >
          <Text style={styles.settingText}>🙊 Про програму</Text>
        </ImageBackground>
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
