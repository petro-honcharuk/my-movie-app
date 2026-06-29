import ItemComponent from "@/src/components/ItemComponent";
import { MovieContext } from "@/src/context/MovieContext";
import { films } from "@/src/data/data";
import { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function Favorites() {
  const context = useContext(MovieContext);
  if (!context) return null;
  const { favorites } = context;
  const myFavorites = films.filter((item) => favorites.includes(item.id));
  console.log(myFavorites);
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
