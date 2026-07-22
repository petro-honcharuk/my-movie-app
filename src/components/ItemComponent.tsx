import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppTheme } from "../Colors/colors";
import { useMovie } from "../hooks/useMovie";
import { useTheme } from "../hooks/useTheme";
import { GENRES_MAP } from "../types/Genres";
import { UserMovie } from "../types/UserMovie";
type Props = {
  film: UserMovie;
};
export default function ItemComponent({ film }: Props) {
  const router = useRouter();
  const { theme } = useTheme();
  const { favorites, isWantToWatch, isWatched } = useMovie();

  const isFavorite = favorites.some((item) => item.id === film.id);
  const isWant = isWantToWatch.some((item) => item.id === film.id);
  const isDone = isWatched.some((item) => item.id === film.id);
  const styles = getStyles(theme);

  return (
    <TouchableOpacity
      style={styles.main}
      onPress={() =>
        router.push({ pathname: "/details", params: { filmId: film.id } })
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

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    main: {
      height: 105,
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      borderRadius: 8,
      backgroundColor: theme.cardBackground,
      padding: 5,
      margin: 2,
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
      color: theme.text,
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
      color: theme.textMuted,
      fontWeight: "bold",
    },
    ratindText: {
      fontSize: 13,
      color: theme.textMuted,
      marginHorizontal: 10,
    },
    genreText: {
      fontSize: 12,
      color: theme.textMuted,
      marginRight: 10,
      marginTop: 20,
    },
    statusIconsContainer: {
      flexDirection: "row",
      gap: 10,
    },
  });
