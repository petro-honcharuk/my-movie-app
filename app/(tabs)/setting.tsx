import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Setting() {
  const router = useRouter();
  return (
    <View style={styles.main}>
      <TouchableOpacity
        style={styles.block}
        onPress={() => router.push("/statisticScreen")}
      >
        <Text style={styles.settingText}>📊 Статистика кіномана </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.block}
        onPress={() => router.push("/settingScreen")}
      >
        <Text style={styles.settingText}>🔩 Керування додатком</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.block}
        onPress={() => router.push("/aboutScreen")}
      >
        <Text style={styles.settingText}>🙊 Про програму</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginBottom: 30,
  },
  block: {
    height: 90,
    marginVertical: 20,
    marginHorizontal: 10,
    backgroundColor: "#d7e2dc",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  settingText: {
    fontSize: 20,
    color: "#2b1706",
  },
});
