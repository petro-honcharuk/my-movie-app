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
  isGrid?: boolean;
};
export default function MovieComponent({ film, isGrid = false }: Props) {
  const router = useRouter();
  const { theme } = useTheme();
  const { favorites, isWantToWatch, isWatched } = useMovie();

  const isFavorite = favorites.some((item) => item.id === film.id);
  const isWant = isWantToWatch.some((item) => item.id === film.id);
  const isDone = isWatched.some((item) => item.id === film.id);
  const styles = getStyles(theme);

  return (
    <TouchableOpacity
      style={isGrid ? styles.main : styles.carousel}
      onPress={() => router.push(`/movie/${film.id}`)}
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
            Рік: {film.release_date.slice(0, 4)}
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
      flex: 1,
      maxWidth: "47%",
      flexDirection: "column", // Картинка зверху, текст знизу
      borderRadius: 12,
      backgroundColor: theme.cardBackground,
      padding: 6,
      //marginRight: 12, // Відступ між картками вбік
    },
    carousel: {
      width: 135,
      flexDirection: "column",
      borderRadius: 12,
      backgroundColor: theme.cardBackground,
      padding: 6,
      marginRight: 12,
    },
    imageParth: {
      height: 190, // Великий гарний постер
      width: "100%",
    },
    infoPatrth: {
      flexDirection: "column",
      marginTop: 6, // Відступ тексту від постера
    },
    title: {
      fontSize: 14, // Трохи менший шрифт, щоб поміщався на вузькій картці
      fontWeight: "bold",
      color: theme.text,
    },
    image: {
      height: "100%",
      width: "100%",
      resizeMode: "cover",
      borderRadius: 10,
    },
    avarageYear: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 4,
    },
    avarageText: {
      fontSize: 13,
      color: theme.textMuted,
      fontWeight: "bold",
    },
    ratindText: {
      fontSize: 11,
      color: theme.textMuted,
    },
    statusIconsContainer: {
      flexDirection: "row",
      gap: 4,
    },
    // Жанри на такій маленькій картці можна сховати або залишити, але з меншим шрифтом
    genreText: {
      fontSize: 11,
      color: theme.textMuted,
      marginTop: 4,
    },
  });
