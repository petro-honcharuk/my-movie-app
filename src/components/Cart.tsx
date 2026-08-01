import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppTheme } from "../Colors/colors";
import { useMovie } from "../hooks/useMovie";
import { useTheme } from "../hooks/useTheme";
import { MovieListType } from "../types/UserMovie";

type Props = {
  title: string;
  listType: MovieListType;
};

export default function Cart({ title, listType }: Props) {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { favorites, isWantToWatch, isWatched } = useMovie();
  const getCount = () => {
    if (listType === "favorites") return favorites.length;
    if (listType === "wantToWatch") return isWantToWatch.length;
    if (listType === "watched") return isWatched.length;
    return 0;
  };
  const handlePress = () => {
    router.push({
      pathname: "/movie_grid",
      params: {
        listType: listType,
        title: title,
      },
    });
  };
  return (
    <TouchableOpacity style={styles.btnCard} onPress={handlePress}>
      <View style={styles.fonImage}>
        <View>
          <Text style={styles.cardText}>
            {title}: {getCount()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    btnCard: {
      borderRadius: 5,
      borderColor: theme.border,
      backgroundColor: theme.cardBackground,
      height: 100,
      marginHorizontal: 5,
      marginVertical: 5,
    },
    cardText: {
      marginHorizontal: 10,
      marginVertical: 5,
      fontSize: 20,
      fontWeight: "bold",
      color: theme.text,
    },
    fonImage: {
      height: "100%",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
  });
