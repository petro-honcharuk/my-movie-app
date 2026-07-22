import Cart from "@/src/components/Cart";
import { createStyles, useStyles } from "@/src/theme";
import { useRouter } from "expo-router";
import { TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.main}>
      <TouchableOpacity onPress={() => router.push("/search")}>
        <TextInput
          style={styles.input}
          placeholder="Введіть назву фільму..."
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>
      <Cart title="Топ моїх улюблених фільмів" listType="favorites" />
      <Cart title="Фільми які я хочу подивитися" listType="wantToWatch" />
      <Cart title="Показати всі переглянуті фільми" listType="watched" />
    </View>
  );
}

const stylesheet = createStyles((theme) => ({
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
}));
