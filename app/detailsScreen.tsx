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
  const [movieDetails, setMovieDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const [isWantToWatch, setIsWantToWatch] = useState(false);

  const { filmId } = useLocalSearchParams();
  const searchMovieById = async (id: number) => {
    setIsLoading(true);
    const API_KEY = "60957792ffba17ec8b3c400a91e8f7b3";
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=uk-UA`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Помилка:${response.status}`);
      const data = await response.json();
      setMovieDetails(data);
    } catch (e) {
      console.log("Помилка при завантажені фільму", e);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  const id = Array.isArray(filmId) ? filmId[0] : filmId;
  useEffect(() => {
    if (id) {
      searchMovieById(Number(id));
    }
  }, [id]);
  if (isLoading || !movieDetails) {
    return <ActivityIndicator />;
  }

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
                  <Text>{g.name},</Text>
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
          style={isWantToWatch ? styles.btnActive : styles.btnInActive}
          onPress={() => setIsWantToWatch(!isWantToWatch)}
        >
          <Text
            style={
              isWantToWatch ? styles.btnTextActive : styles.btnTextInActive
            }
          >
            Хочу подивитися
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsWatched(!isWatched)}
          style={isWatched ? styles.btnActive : styles.btnInActive}
        >
          <Text
            style={isWatched ? styles.btnTextActive : styles.btnTextInActive}
          >
            Переглянуто
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
    alignSelf: "center",
    marginVertical: 5,
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
  },
  titleText: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginTop: 10,
    // borderWidth: 1,
  },
  textInfo: {
    fontSize: 14,
    color: "#172433",
  },
  mainTextInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "49%",
    justifyContent: "flex-end",
    //borderWidth: 1,
  },
  overviewContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#033a50",
    borderBottomWidth: 1,
    borderBottomColor: "#70adbf",
  },
  overviewText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#033a50",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 20,
  },
  btnActive: {
    height: 40,
    width: 150,
    backgroundColor: "#1b7abd",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  btnTextActive: {
    fontSize: 16,
    color: "white",
  },
  btnInActive: {
    height: 40,
    width: 150,
    backgroundColor: "#adbac3",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  btnTextInActive: {
    fontSize: 16,
    color: "#2c2c2e",
  },
});
