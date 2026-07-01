import { MovieListType } from "@/src/types/UserMovie";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
type MovieGridParams = {
  listType: MovieListType;
  title: string;
};

export default function MovieGrig() {
  const { listType, title } = useLocalSearchParams<MovieGridParams>();
  return (
    <View style={styles.main}>
      <Text style={styles.headerTitle}>{title}</Text>
      <Text style={styles.listTitle}>{listType}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 8,
    alignSelf: "center",
  },
  listTitle: {
    fontSize: 12,
    alignSelf: "center",
  },
});
