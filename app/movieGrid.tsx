import ItemComponent from "@/src/components/ItemComponent";
import { useMovie } from "@/src/hooks/useMovie";
import { MovieListType, UserMovie } from "@/src/types/UserMovie";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

type MovieGridParams = {
  listType: MovieListType;
  title: string;
};

export default function MovieGrig() {
  const { listType, title } = useLocalSearchParams<MovieGridParams>();
  const { favorites, isWantToWatch, isWatched } = useMovie();
  let currentMovies: UserMovie[] = [];

  switch (listType) {
    case "favorites":
      currentMovies = favorites;
      break;
    case "wantToWatch":
      currentMovies = isWantToWatch;
      break;
    case "watched":
      currentMovies = isWatched;
      break;
    default:
      currentMovies = [];
  }

  return (
    <View style={styles.main}>
      <FlatList
        data={currentMovies}
        keyExtractor={(item) => item.id.toString()}
        // Перевикористовуємо старий компонент картки
        renderItem={({ item }) => <ItemComponent film={item} />}
        // Додаємо обробку порожнього списку, якщо користувач ще нічого туди не додав
        ListEmptyComponent={() => <Text>У цьому списку ще немає фільмів</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 8,
    alignSelf: "center",
  },
  listTitle: {
    fontSize: 12,
    alignSelf: "center",
  },
});
