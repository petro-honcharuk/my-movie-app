import ItemComponent from "@/src/components/ItemComponent";
import { MovieContext } from "@/src/context/MovieContext";

import { useLocalSearchParams } from "expo-router";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DetailsScreen() {
  const { id, title, genre, rating } = useLocalSearchParams<{
    id: string;
    title: string;
    genre: string;
    rating: string;
  }>();
  const context = useContext(MovieContext);
  if (!context) return null;
  const { favorites, toggleFavorites, allFilms } = context;
  const isFavorites = favorites.includes(id);
  const detailFilm = allFilms.find((item) => item.id === id);

  if (detailFilm)
    return (
      <View style={styles.main}>
        <ItemComponent film={detailFilm} />
        <TouchableOpacity
          style={styles.btnAdd}
          onPress={() => toggleFavorites(id)}
        >
          <Text style={styles.btnAddText}>
            {!isFavorites ? "Додати в улюблені" : "Видалити з улюблених"}
          </Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  btnAdd: {
    alignItems: "center",
    justifyContent: "center",
    height: 38,
    backgroundColor: "#0f50d3",
    marginHorizontal: 8,
    marginVertical: 5,
    borderRadius: 5,
  },
  btnAddText: {
    color: "white",
    fontSize: 18,
  },
});
