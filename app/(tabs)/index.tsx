import { AppTheme } from "@/src/Colors/colors";
import { useTheme } from "@/src/hooks/useTheme";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.main}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("/(auth)/login")}
      >
        <Text>На логін</Text>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: "center",
      justifyContent: "center",
    },
    input: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: theme.border,
      marginHorizontal: 5,
      marginVertical: 10,
      backgroundColor: "#ecedee",
    },
    btn: {
      marginHorizontal: 10,
      marginVertical: 10,
      backgroundColor: "#077eba",
      height: 40,
      width: "90%",
      alignItems: "center",
      justifyContent: "center",
    },
  });
