import { AppTheme } from "@/src/Colors/colors";
import MovieComponent from "@/src/components/MovieComponent";
import { useTheme } from "@/src/hooks/useTheme";
import { getMovieByCategory } from "@/src/services/movies";

import { TMDBMovie } from "@/src/types/tmdb";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Index() {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [nowPlaying, setNowPlaying] = useState<TMDBMovie[] | undefined>([]);
  const [popular, setPopular] = useState<TMDBMovie[] | undefined>([]);
  const [upcoming, setUpcoming] = useState<TMDBMovie[] | undefined>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadHomeData = async () => {
      setLoading(true);
      try {
        const nowPlayingData = await getMovieByCategory("now_playing");
        const nowPopular = await getMovieByCategory("top_rated");
        const upComingData = await getMovieByCategory("upcoming");
        setNowPlaying(nowPlayingData);
        setPopular(nowPopular);
        setUpcoming(upComingData);
        if (!nowPlayingData || !nowPopular) {
          console.log("Дані не прийшли, nowPlayingData є undefined");
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };

    loadHomeData();
  }, []);

  return (
    <View style={styles.main}>
      {!loading && (
        <ScrollView>
          <Text style={styles.titleMain}>Мій кінощоденник</Text>
          <Text style={styles.title}>Переглядають зараз</Text>
          <FlatList
            data={nowPlaying}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieComponent film={item} />}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
          <Text style={styles.title}>Топ рейтингу</Text>
          <FlatList
            data={popular}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieComponent film={item} />}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
          <Text style={styles.title}>Анонс</Text>
          <FlatList
            data={upcoming}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieComponent film={item} />}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </ScrollView>
      )}
      {loading && (
        <ActivityIndicator
          size="large"
          color={theme.border}
          style={styles.loader}
        />
      )}
    </View>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: theme.background,
    },
    loader: {
      marginVertical: 10,
    },
    titleMain: {
      alignSelf: "center",
      color: theme.text,
      fontSize: 20,
      fontWeight: "bold",
      marginVertical: 5,
      marginLeft: 10,
    },
    title: {
      color: theme.text,
      fontSize: 18,
      fontWeight: "bold",
      marginVertical: 5,
      marginLeft: 10,
    },
  });
