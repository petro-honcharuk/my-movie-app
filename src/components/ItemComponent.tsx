import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { UserMovie } from "../types/UserMovie";
type Props = {
  film: UserMovie;
};
export default function ItemComponent({ film }: Props) {
  return (
    <View style={styles.main}>
      <Text>{film.title}</Text>
      <Text>{film.genre}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: 100,
  },
});
