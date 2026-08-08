import { AppTheme } from "@/src/Colors/colors";
import MovieComponent from "@/src/components/MovieComponent";
import { useMovie } from "@/src/hooks/useMovie";
import { useTheme } from "@/src/hooks/useTheme";
import { MovieListType, UserMovie } from "@/src/types/UserMovie";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type MovieGridParams = {
  listType: MovieListType;
  title: string;
};

export default function MovieGrig() {
  const insets = useSafeAreaInsets();
  const { listType, title } = useLocalSearchParams<MovieGridParams>();
  const { favorites, isWantToWatch, isWatched } = useMovie();
  const { theme } = useTheme();
  const [searchText, setSearchText] = useState("");
  const styles = getStyles(theme);
  const router = useRouter();
  let currentMovies: UserMovie[] = [];

  switch (listType) {
    case "favorites":
      currentMovies = favorites;
      break;
    case "wantToWatch":
      currentMovies = isWantToWatch;
      break;
    case "watched":
      currentMovies = isWatched;
      break;
    default:
      currentMovies = [];
  }
  const displayMovies = currentMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchText.toLowerCase()),
  );
  // const displayMovies = listType === "watched" ? filtredMovies : currentMovies;

  return (
    <View style={[styles.main, { marginTop: insets.top + 5 }]}>
      <View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Пошук..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={displayMovies}
        style={styles.list}
        numColumns={2}
        columnWrapperStyle={styles.row}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieComponent film={item} isGrid={true} />}
        ListEmptyComponent={() => <Text>У цьому списку ще немає фільмів</Text>}
      />
    </View>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: theme.background,
      marginBottom: 50,
    },
    headerPage: {
      flexDirection: "row",
      height: "10%",
    },
    backButton: {
      position: "absolute",
      width: 40,
      height: 40,
      marginLeft: 12,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(29, 29, 29, 0.4)",
    },
    title: {
      color: theme.text,
      fontSize: 20,
      fontWeight: "bold",
      alignSelf: "center",
      marginVertical: 5,
      marginLeft: 20,
    },

    input: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: theme.border,
      marginHorizontal: 5,
      marginVertical: 10,
      backgroundColor: "#ecedee",
    },
    list: {
      marginTop: 3,
      marginHorizontal: 15,
    },
    row: {
      justifyContent: "space-between",
      marginBottom: 14,
      paddingHorizontal: 4,
    },
  });
