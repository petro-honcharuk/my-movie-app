import ItemComponent from "@/src/components/ItemComponent";
import { films } from "@/src/data/data";
import { FlatList, StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.main}>
      <FlatList
        data={films}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemComponent film={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
