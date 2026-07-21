import { AppTheme } from "@/src/Colors/colors";
import ItemComponent from "@/src/components/ItemComponent";
import { useMovie } from "@/src/hooks/useMovie";
import { MovieListType, UserMovie } from "@/src/types/UserMovie";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

type MovieGridParams = {
  listType: MovieListType;
  title: string;
};

export default function MovieGrig() {
  const { listType, title } = useLocalSearchParams<MovieGridParams>();
  const { favorites, isWantToWatch, isWatched, theme } = useMovie();
  const [searchText, setSearchText] = useState("");
  const styles = getStyles(theme);
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
  const filtredMovies = currentMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchText.toLowerCase()),
  );
  const displayMovies = listType === "watched" ? filtredMovies : currentMovies;

  return (
    <View style={styles.main}>
      {listType === "watched" && (
        <TextInput
          style={styles.input}
          placeholder="Пошук..."
          value={searchText}
          onChangeText={setSearchText}
        />
      )}

      <FlatList
        data={displayMovies}
        keyExtractor={(item) => item.id.toString()}
        // Перевикористовуємо старий компонент картки
        renderItem={({ item }) => <ItemComponent film={item} />}
        // Додаємо обробку порожнього списку, якщо користувач ще нічого туди не додав
        ListEmptyComponent={() => <Text>У цьому списку ще немає фільмів</Text>}
      />
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
