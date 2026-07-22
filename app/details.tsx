import { useGetMovieDetails } from "@/src/hooks/useGetMovieDetails.hook";
import { createStyles, useStyles } from "@/src/theme";

import { useLocalSearchParams } from "expo-router";

import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DetailsScreen() {
  const { filmId } = useLocalSearchParams();
  const { styles } = useStyles(stylesheet);

  const { toggleWantToWatch, toggleWatched, toggleFavorites } =
    useMovieContext();

  const { data, loading, error } = useGetMovieDetails({
    movieId: filmId as string,
  });

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error getting fild details</Text>;
  }

  return (
    <View style={styles.main}>
      <Text style={styles.title} numberOfLines={2}>
        {data?.title}
      </Text>
      <View style={styles.mainInfo}>
        <Image
          source={{
            uri: `${process.env.EXPO_PUBLIC_IMAGE_URL}${data?.poster_path}`,
          }}
          style={styles.image}
        />
        <View style={styles.info}>
          <View style={styles.titleText}>
            <Text style={styles.textInfo}>Рік:</Text>
            <Text style={styles.textInfo}>{data?.release_date}</Text>
          </View>
          <View style={styles.titleText}>
            <Text style={styles.textInfo}>Жанр:</Text>
            <View style={styles.mainTextInfo}>
              {data?.genres.map((item) => (
                <View key={item.id}>
                  <Text style={styles.textInfo}>{item.name},</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.titleText}>
            <Text style={styles.textInfo}>Країна:</Text>
            <Text style={styles.textInfo}> {data?.origin_country}</Text>
          </View>

          <View style={styles.titleText}>
            <Text style={styles.textInfo}>Тривалість:</Text>
            <Text style={styles.textInfo}> {data?.runtime} хв.</Text>
          </View>
        </View>
      </View>
      <View style={styles.overviewContainer}>
        <Text style={styles.overviewTitle}>Короткий опис фільму:</Text>
        {data?.overview && data?.overview?.length > 0 ? (
          <Text style={styles.overviewText}> {data?.overview}...</Text>
        ) : (
          <Text style={styles.overviewText}>На сайті опис відсутній...</Text>
        )}
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={data?.isWantToWatch ? styles.btnActive : styles.btnInActive}
          onPress={() => toggleWantToWatch(data)}
        >
          <Text
            style={
              data?.isWantToWatch
                ? styles.btnTextActive
                : styles.btnTextInActive
            }
          >
            {data?.isWantToWatch
              ? "Видалити з 'Хочу подивитися'"
              : "Хочу подивитися"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleWatched(data)}
          style={data?.isWatched ? styles.btnActive : styles.btnInActive}
        >
          <Text
            style={
              data?.isWatched ? styles.btnTextActive : styles.btnTextInActive
            }
          >
            {data?.isWatched ? "Видалити з 'Переглянуто'" : "Переглянуто"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleFavorites(data)}
          style={data?.isFavorite ? styles.btnActive : styles.btnInActive}
        >
          <Text
            style={
              data?.isFavorite ? styles.btnTextActive : styles.btnTextInActive
            }
          >
            {data?.isFavorite ? "Видалити з  улюблених" : "Додати в улюблені"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const stylesheet = createStyles((theme) => ({
  main: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
    alignSelf: "center",
    marginVertical: 5,
    color: theme.colors.text,
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
    color: theme.colors.text,
  },
  titleText: {
    flexDirection: "row",
    justifyContent: "space-between",
    color: theme.colors.text,
    marginTop: 10,
    // borderWidth: 1,
  },
  textInfo: {
    fontSize: 14,
    color: theme.colors.text,
  },
  mainTextInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "49%",
    justifyContent: "flex-end",
    color: theme.colors.text,
    //borderWidth: 1,
  },
  overviewContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: theme.colors.text,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  overviewText: {
    fontSize: 16,
    fontWeight: "400",
    color: theme.colors.text,
  },
  btnContainer: {
    position: "absolute",
    bottom: 50,
    backgroundColor: theme.colors.background,
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
}));
function useMovieContext(): {
  toggleWantToWatch: any;
  toggleWatched: any;
  toggleFavorites: any;
  favoriteMovies: any;
  wantToWatchMovies: any;
  watchedMovies: any;
} {
  throw new Error("Function not implemented.");
}
