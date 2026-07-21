import { AppTheme } from "@/src/Colors/colors";
import { useMovie } from "@/src/hooks/useMovie";
import { getMovieById } from "@/src/services/movies";
import { UserMovie } from "@/src/types/UserMovie";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DetailsScreen() {
  const { filmId } = useLocalSearchParams();
  const {
    favorites,
    toggleFavorites,
    isWantToWatch,
    toggleWantToWatch,
    isWatched,
    toggleWatched,
    theme,
  } = useMovie();
  const styles = getStyles(theme);
  const [movieDetails, setMovieDetails] = useState<any>(null);
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
  const id = Array.isArray(filmId) ? filmId[0] : filmId;
  useEffect(() => {
    if (id) {
      searchMovieById(id);
    }
  }, [id]);
  if (isLoading || !movieDetails) {
    return <ActivityIndicator />;
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

  return (
    <View style={styles.main}>
      <Text style={styles.title} numberOfLines={2}>
        {movieDetails.title}
      </Text>
      <View style={styles.mainInfo}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`,
          }}
          style={styles.image}
        />
        <View style={styles.info}>
          <View style={styles.titleText}>
            <Text style={styles.textInfo}>Рік:</Text>
            <Text style={styles.textInfo}>{movieDetails.release_date}</Text>
          </View>
          <View style={styles.titleText}>
            <Text style={styles.textInfo}>Жанр:</Text>
            <View style={styles.mainTextInfo}>
              {movieDetails.genres.map((g: { id: number; name: string }) => (
                <View key={g.id}>
                  <Text style={styles.textInfo}>{g.name},</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.titleText}>
            <Text style={styles.textInfo}>Країна:</Text>
            <Text style={styles.textInfo}> {movieDetails.origin_country}</Text>
          </View>

          <View style={styles.titleText}>
            <Text style={styles.textInfo}>Тривалість:</Text>
            <Text style={styles.textInfo}> {movieDetails.runtime} хв.</Text>
          </View>
        </View>
      </View>
      <View style={styles.overviewContainer}>
        <Text style={styles.overviewTitle}>Короткий опис фільму:</Text>
        {movieDetails?.overview?.length > 0 ? (
          <Text style={styles.overviewText}> {movieDetails.overview}...</Text>
        ) : (
          <Text style={styles.overviewText}>На сайті опис відсутній...</Text>
        )}
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={isWant ? styles.btnActive : styles.btnInActive}
          onPress={() => toggleWantToWatch(movieToSave)}
        >
          <Text style={isWant ? styles.btnTextActive : styles.btnTextInActive}>
            {isWant ? "Видалити з 'Хочу подивитися'" : "Хочу подивитися"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleWatched(movieToSave)}
          style={isDone ? styles.btnActive : styles.btnInActive}
        >
          <Text style={isDone ? styles.btnTextActive : styles.btnTextInActive}>
            {isDone ? "Видалити з 'Переглянуто'" : "Переглянуто"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleFavorites(movieToSave)}
          style={isFavorite ? styles.btnActive : styles.btnInActive}
        >
          <Text
            style={isFavorite ? styles.btnTextActive : styles.btnTextInActive}
          >
            {isFavorite ? "Видалити з  улюблених" : "Додати в улюблені"}
          </Text>
        </TouchableOpacity>
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
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginLeft: 8,
      alignSelf: "center",
      marginVertical: 5,
      color: theme.text,
    },
    mainInfo: {
      flexDirection: "row",
      marginVertical: 8,
      marginHorizontal: 10,
    },
    image: {
      width: 150,
      height: 250,
      borderRadius: 8,
    },
    info: {
      flex: 1,
      flexDirection: "column",
      marginHorizontal: 10,
      color: theme.text,
    },
    titleText: {
      flexDirection: "row",
      justifyContent: "space-between",
      color: theme.text,
      marginTop: 10,
      // borderWidth: 1,
    },
    textInfo: {
      fontSize: 14,
      color: theme.text,
    },
    mainTextInfo: {
      flexDirection: "row",
      flexWrap: "wrap",
      width: "49%",
      justifyContent: "flex-end",
      color: theme.text,
      //borderWidth: 1,
    },
    overviewContainer: {
      marginVertical: 10,
      marginHorizontal: 10,
    },
    overviewTitle: {
      fontSize: 16,
      fontWeight: "400",
      color: theme.text,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    overviewText: {
      fontSize: 16,
      fontWeight: "400",
      color: theme.text,
    },
    btnContainer: {
      position: "absolute",
      bottom: 50,
      backgroundColor: theme.background,
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    btnActive: {
      height: 50,
      flex: 1,
      marginHorizontal: 5,
      backgroundColor: "#889dac",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
    },
    btnTextActive: {
      color: "#2c2c2e",
      textAlign: "center",
    },
    btnInActive: {
      height: 50,
      flex: 1,
      marginHorizontal: 5,
      backgroundColor: "#6743bc",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
    },
    btnTextInActive: {
      color: "white",
      textAlign: "center",
    },
  });
