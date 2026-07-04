import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

export default function DetailsScreen() {
  const [movieDetails, setMovieDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    <View>
      <Text>{movieDetails.title}</Text>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`,
        }}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  image: {
    width: 300,
    height: 300,
  },
});
