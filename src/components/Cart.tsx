import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MovieListType } from "../types/UserMovie";
type Props = {
  title: string;
  listType: MovieListType;
};

export default function Cart({ title, listType }: Props) {
  const router = useRouter();
  const handlePress = () => {
    router.push({
      pathname: "/movieGrid",
      params: {
        listType: listType,
        title: title,
      },
    });
  };
  return (
    <TouchableOpacity style={styles.btnCard} onPress={handlePress}>
      <View>
        <Text style={styles.cardText}>{title}:</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnCard: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#c0c4c5",
    backgroundColor: "#a6c3d0",
    height: 100,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  cardText: {
    marginHorizontal: 10,
    marginVertical: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
});
