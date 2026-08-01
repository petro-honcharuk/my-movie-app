import { AppTheme } from "@/src/Colors/colors";
import { useMovie } from "@/src/hooks/useMovie";
import { useTheme } from "@/src/hooks/useTheme";
import { getMovieById } from "@/src/services/movies";
import { TMDBMovieDetails } from "@/src/types/TMDBMovieDetails";
import { UserMovie } from "@/src/types/UserMovie";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    favorites,
    toggleFavorites,
    isWantToWatch,
    toggleWantToWatch,
    isWatched,
    toggleWatched,
  } = useMovie();
  const styles = getStyles(theme);
  const [movieDetails, setMovieDetails] = useState<TMDBMovieDetails | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  const searchMovieById = async (movieId: string) => {
    setIsLoading(true);

    try {
      const data = await getMovieById({ movieId });
      setMovieDetails(data);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      const validId = Array.isArray(id) ? id[0] : id;
      searchMovieById(validId);
    }
  }, [id]);
  if (isLoading || !movieDetails) {
    return <ActivityIndicator size="large" />;
  }

  const isFavorite = favorites.some((item) => item.id === movieDetails?.id);
  const isWant = isWantToWatch.some((item) => item.id === movieDetails?.id);
  const isDone = isWatched.some((item) => item.id === movieDetails?.id);
  const movieToSave: UserMovie = {
    id: movieDetails.id,
    title: movieDetails.title,
    poster_path: movieDetails.poster_path,
    vote_average: movieDetails.vote_average,
    release_date: movieDetails.release_date,
    // Перетворюємо масив об'єктів [{id: 28, name: "..."}] на масив чисел [28]
    genre_ids: movieDetails.genres
      ? movieDetails.genres.map((g: any) => g.id)
      : [],
    runtime: movieDetails.runtime,
  };

  const genresString = movieDetails.genres.map((g) => g.name).join(", ");
  const countryStr = movieDetails.origin_country.map((g) => g).join(", ");
  const rating = movieDetails.vote_average.toFixed(1);
  const movieTime = (totalMin: number) => {
    const hours = Math.floor(totalMin / 60);
    const minutes = totalMin % 60;

    const paddedHours = String(hours).padStart(2, "0");
    const paddedMinutes = String(minutes).padStart(2, "0");

    return `${paddedHours} год ${paddedMinutes} хв`; // Результат: "02:15"
  };

  return (
    <ScrollView style={[styles.main, { marginTop: insets.top }]}>
      <View style={styles.descriptionContainer}>
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/w780${movieDetails?.backdrop_path}`,
          }}
          style={styles.backdropImage}
          imageStyle={styles.image}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#FFF" />
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.rowDescrContainer}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`,
            }}
            style={styles.smallImage}
          />

          <View style={styles.textDescrCont}>
            <Text style={styles.title} numberOfLines={2}>
              {movieDetails.title}
            </Text>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoText}>🗓 Дата виходу: </Text>
              <Text style={styles.infoText}>{movieDetails.release_date}</Text>
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoText}>🗂 Жанр: </Text>
              <Text numberOfLines={2} style={styles.infoText}>
                {genresString}
              </Text>
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoText}>📡 Країна: </Text>
              <Text style={styles.infoText}>{countryStr}</Text>
            </View>
          </View>
        </View>
        <View style={styles.infoRowContainer}>
          <Text style={styles.textInfoRow}>
            ⏱ : {movieTime(movieDetails.runtime)}
          </Text>
          <Text style={styles.textInfoRow}>🏅 : {rating}</Text>
          <Text style={styles.textInfoRow}>
            🧑🏿‍🦳 : {movieDetails.vote_count} людей
          </Text>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => toggleFavorites(movieToSave)}
        >
          <Text style={styles.btnText}>
            {isFavorite ? "Не подобається" : "В Улюблені"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => toggleWatched(movieToSave)}
        >
          <Text style={styles.btnText}>
            {isDone ? "Переглянуто" : "Не переглянуто"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => toggleWantToWatch(movieToSave)}
        >
          <Text style={styles.btnText}>
            {isWant ? "Добавлено" : "Хочу подивитися"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.overviewContainer}>
        <Text style={styles.titleOverview}>Опис сюжету фільму:</Text>
        <Text style={styles.textOverview}>
          {"\u00A0\u00A0\u00A0\u00A0"}
          {movieDetails.overview}..
        </Text>
      </View>
    </ScrollView>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: theme.background,
      marginBottom: 50,
    },
    descriptionContainer: {
      margin: 5,
      borderRadius: 14,
      position: "relative",
      padding: 4,
    },
    backdropImage: {
      width: "100%",
      height: 190,
    },
    image: {
      borderRadius: 14,
    },
    backButton: {
      position: "absolute",
      width: 40,
      height: 40,
      marginLeft: 12,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(29, 29, 29, 0.6)",
    },
    rowDescrContainer: {
      flexDirection: "row",
      padding: 5,
    },
    smallImage: {
      top: -50,
      marginLeft: 10,
      height: 160,
      width: 110,
      zIndex: 1,
      borderRadius: 14,
    },
    textDescrCont: {
      marginLeft: 12,
      flex: 1,
    },
    title: {
      color: theme.text,
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 6,
    },
    infoTextContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      flexWrap: "wrap",
      marginVertical: 2,
    },
    infoText: {
      fontSize: 11,
      color: theme.textMuted,
    },
    infoRowContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: -20,
      marginBottom: 16,
      width: "90%",
      alignSelf: "center",
    },
    textInfoRow: {
      fontSize: 12,
      color: theme.textMuted,
    },
    btnContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "95%",
      alignSelf: "center",
      marginVertical: 10,
    },
    button: {
      height: 40,
      flex: 1,
      marginHorizontal: 4,
      backgroundColor: theme.cardBackground,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
    },
    btnText: {
      fontSize: 11,
      color: theme.text,
      fontWeight: "600",
      textAlign: "center",
    },
    overviewContainer: {
      marginHorizontal: 16,
      marginVertical: 12,
    },
    titleOverview: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 6,
    },
    textOverview: {
      fontSize: 14,

      textAlign: "justify",
      color: theme.textMuted,
      lineHeight: 20,
    },
  });
