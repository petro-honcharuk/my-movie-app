import { AppTheme } from "@/src/Colors/colors";
import Cart from "@/src/components/Cart";
import { useTheme } from "@/src/hooks/useTheme";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.main}>
      {/* <TouchableOpacity onPress={() => router.push("/search")}>
        <TextInput
          style={styles.input}
          placeholder="Введіть назву фільму..."
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity> */}
      <Cart title="Топ моїх улюблених фільмів" listType="favorites" />
      <Cart title="Фільми які я хочу подивитися" listType="wantToWatch" />
      <Cart title="Показати всі переглянуті фільми" listType="watched" />
    </View>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: theme.background,
    },
    input: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: theme.border,
      marginHorizontal: 5,
      marginVertical: 10,
      backgroundColor: "#ecedee",
    },
  });
