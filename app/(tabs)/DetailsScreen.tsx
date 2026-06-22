import ItemComponent from "@/src/components/ItemComponent";
import { films } from "@/src/data/data";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function DetailsScreen() {
  const { data } = useLocalSearchParams();
  const detailFilm = films.find((item) => item.id === data);
  if (detailFilm)
    return (
      <View>
        <ItemComponent film={detailFilm} />
      </View>
    );
}

const styles = StyleSheet.create({});
