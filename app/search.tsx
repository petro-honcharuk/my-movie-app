import { UserMovie } from "@/src/types/UserMovie";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState<UserMovie[]>([]);
  return (
    <View style={styles.main}>
      <TextInput
        style={styles.input}
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        autoFocus={true}
      />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#44575c",
    marginHorizontal: 5,
    marginVertical: 10,
  },
  list: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#44575c",
    marginHorizontal: 5,
    marginVertical: 10,
  },
});
