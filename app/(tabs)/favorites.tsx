import ItemComponent from "@/src/components/ItemComponent";
import { MovieContext } from "@/src/context/MovieContext";

import { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function Favorites() {
  const context = useContext(MovieContext);
  if (!context) return null;
  const { favorites, allFilms } = context;
  const myFavorites = allFilms.filter((item) => favorites.includes(item.id));

  return (
    <View style={styles.main}>
      <FlatList
        data={myFavorites}
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
