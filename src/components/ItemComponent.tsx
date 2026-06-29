import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Film } from "../types/types";
type Props = {
  film: Film;
};

export default function ItemComponent({ film }: Props) {
  const router = useRouter();
  return (
    <View>
      <TouchableOpacity
        style={styles.main}
        onPress={() =>
          router.push({
            pathname: "/DetailsScreen",
            params: {
              id: film.id,
              title: film.title,
              genre: film.genre,
              rating: film.rating,
            },
          })
        }
      >
        <View style={styles.leftBox}>
          <Text style={styles.title}>Назва: {film.title}</Text>
          <Text style={styles.genre}>Жанр {film.genre}</Text>
        </View>
        <View style={styles.rigthBox}>
          <Text style={styles.rating}>{film.rating}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    padding: 3,
  },
  leftBox: {
    marginHorizontal: 5,
    marginVertical: 2,
  },
  rigthBox: {
    marginHorizontal: 5,
    marginVertical: 2,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,

    color: "black",
    fontWeight: "bold",
  },
  genre: {
    fontSize: 12,
    color: "black",
  },
  rating: {
    fontSize: 14,
    color: "black",
    fontWeight: "600",
  },
});
