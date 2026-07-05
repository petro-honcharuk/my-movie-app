import Cart from "@/src/components/Cart";
import { useRouter } from "expo-router";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  // useEffect(() => {
  //   // Додайте цей рядок ОДИН РАЗ, запустіть додаток, щоб пам'ять стерлася, а потім видаліть його
  //   AsyncStorage.clear();
  // }, []);
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

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#44575c",
    marginHorizontal: 5,
    marginVertical: 10,
  },
});
