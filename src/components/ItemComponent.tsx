import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMovie } from "../hooks/useMovie";
import { GENRES_MAP } from "../types/Genres";
import { UserMovie } from "../types/UserMovie";
type Props = {
  film: UserMovie;
};
export default function ItemComponent({ film }: Props) {
  const router = useRouter();
  const { favorites, isWantToWatch, isWatched } = useMovie();

  const isFavorite = favorites.some((item) => item.id === film.id);
  const isWant = isWantToWatch.some((item) => item.id === film.id);
  const isDone = isWatched.some((item) => item.id === film.id);

  return (
    <TouchableOpacity
      style={styles.main}
      onPress={() =>
        router.push({ pathname: "/detailsScreen", params: { filmId: film.id } })
      }
    >
      <View style={styles.imageParth}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${film.poster_path}` }}
          style={styles.image}
        />
      </View>
      <View style={styles.infoPatrth}>
        <Text style={styles.title} numberOfLines={2}>
          {film.title}
        </Text>
        <View style={styles.avarageYear}>
          <Text style={styles.avarageText}>{film.vote_average.toFixed(1)}</Text>
          <View style={styles.statusIconsContainer}>
            {isFavorite && <Text>⭐️</Text>}
            {isWant && <Text>⏳</Text>}
            {isDone && <Text>✅</Text>}
          </View>
          <Text style={styles.ratindText}>
            Рік виходу: {film.release_date.slice(0, 4)}
          </Text>
        </View>
        <Text style={styles.genreText} numberOfLines={1}>
          Жанр:{" "}
          {(film.genre_ids || [])
            .map((id) => GENRES_MAP[id])
            .filter(Boolean)
            .join(", ")}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    height: 105,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ecececec",
    padding: 5,
  },
  imageParth: {
    height: 95,
    width: 65,
  },
  infoPatrth: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    borderRadius: 8,
  },
  avarageYear: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avarageText: {
    fontSize: 16,
    color: "#ee5109",
    fontWeight: "bold",
  },
  ratindText: {
    fontSize: 13,
    color: "#029a5a",
    marginHorizontal: 10,
  },
  genreText: {
    fontSize: 12,
    color: "#267486",
    marginRight: 10,
    marginTop: 20,
  },
  statusIconsContainer: {
    flexDirection: "row",
    gap: 10,
  },
});
