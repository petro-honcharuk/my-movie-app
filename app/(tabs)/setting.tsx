import { createStyles, useStyles } from "@/src/theme";
import { useRouter } from "expo-router";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

export default function Setting() {
  const router = useRouter();
  const { styles, theme } = useStyles(stylesheet);

  return (
    <View style={styles.main}>
      <TouchableOpacity
        style={styles.block}
        onPress={() => router.push("/statisticScreen")}
      >
        <ImageBackground
          source={theme.images.fonSetting}
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
          source={theme.images.fonSetting}
          style={styles.image}
          imageStyle={{ borderRadius: 8 }}
        >
          <Text style={styles.settingText}>🔩 Керування додатком</Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.block}
        onPress={() => router.push("/about")}
      >
        <ImageBackground
          source={theme.images.fonSetting}
          style={styles.image}
          imageStyle={{ borderRadius: 8 }}
        >
          <Text style={styles.settingText}>🙊 Про програму</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}

const stylesheet = createStyles((theme) => ({
  main: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  block: {
    height: 90,
    marginVertical: 20,
    marginHorizontal: 10,
    backgroundColor: theme.colors.cardBackground,
    borderBottomColor: theme.colors.border,
    borderRadius: 8,
  },
  settingText: {
    fontSize: 20,
    color: theme.colors.text,
  },
  image: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
}));
