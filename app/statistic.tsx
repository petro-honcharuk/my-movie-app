import { AppTheme } from "@/src/Colors/colors";
import { useMovie } from "@/src/hooks/useMovie";
import { useTheme } from "@/src/hooks/useTheme";
import { GENRES_MAP } from "@/src/types/Genres";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function StatisticScreen() {
  const { isWatched, favorites } = useMovie();
  const { theme, isDarkMode } = useTheme();
  const styles = getStyles(theme);
  const totalMinutes = isWatched.reduce((sum, film) => {
    return sum + (film.runtime || 100);
  }, 0);
  // Об'єкт для підрахунку: { [genreId]: кількість_появ }
  const genreCounts: Record<number, number> = {};

  isWatched.forEach((movie) => {
    // Перевіряємо, чи є у фільму взагалі жанри, щоб не було помилки
    if (movie.genre_ids) {
      movie.genre_ids.forEach((id) => {
        // Якщо такий ID вже є в об'єкті — додаємо 1, якщо немає — ставимо 1
        genreCounts[id] = (genreCounts[id] || 0) + 1;
      });
    }
  });
  let favoriteGenreId: number | null = null;
  let maxCount = 0;

  // Перебираємо всі пораховані жанри
  Object.entries(genreCounts).forEach(([id, count]) => {
    if (count > maxCount) {
      maxCount = count;
      favoriteGenreId = Number(id); // перетворюємо ключ назад у число
    }
  });
  // Якщо фільмів ще немає, або жанр не знайшовся, ставимо прочерк
  const favoriteGenreName = favoriteGenreId
    ? GENRES_MAP[favoriteGenreId]
    : "Ще немає даних";

  return (
    <View style={styles.main}>
      <View style={styles.row}>
        <Text style={styles.text}>Переглянутих фільмів 👁️:</Text>
        <Text style={styles.number}>{isWatched.length}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.text}>Улюблених фільмів ⭐:</Text>
        <Text style={styles.number}>{favorites.length}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Улюблений жанр 📹:</Text>
        <Text style={styles.number}>{favoriteGenreName}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Час у кіно ⏱:</Text>
        <Text style={styles.text}>
          {Math.floor(totalMinutes / 60)} год. {totalMinutes % 60} хв.
        </Text>
      </View>
    </View>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: theme.background,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      height: 70,
      alignItems: "center",
      marginVertical: 10,
      marginHorizontal: 5,
      backgroundColor: theme.cardBackground,
      borderBottomColor: theme.border,
      borderRadius: 8,
      padding: 5,
    },
    text: {
      color: theme.text,
      fontSize: 18,
    },
    number: {
      color: theme.text,
      fontSize: 18,
      marginRight: 10,
    },
    image: {
      height: "100%",
      width: "100%",
    },
  });
