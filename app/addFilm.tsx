import { MovieContext } from "@/src/context/MovieContext";
import { Film } from "@/src/types/types";
import { Stack, useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddFilm() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const context = useContext(MovieContext);
  if (!context) return null;
  const { addFilm } = context;

  const handleAddFilm = () => {
    const newFilm: Film = {
      id: Date.now().toString(),
      title: title,
      genre: genre,
      rating: Number(rating),
    };
    addFilm(newFilm);
    router.back();
  };

  return (
    <View style={styles.main}>
      <Stack.Screen
        options={{ title: "Додати фільм", headerTitleAlign: "center" }}
      />
      <Text style={styles.title}>Назва:</Text>
      <TextInput
        style={styles.input}
        placeholder="Введіть назву"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.title}>Жанр:</Text>
      <TextInput
        style={styles.input}
        placeholder="Введіть жанр"
        value={genre}
        onChangeText={setGenre}
      />
      <Text style={styles.title}>Рейтинг:</Text>
      <TextInput
        style={styles.input}
        placeholder="Введіть рейтинг"
        keyboardType={"numeric"}
        value={rating}
        onChangeText={setRating}
      />
      <TouchableOpacity style={styles.btnAdd} onPress={() => handleAddFilm()}>
        <Text style={styles.btnAddText}>Додати фільм</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: "#32393f",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    height: 38,
    borderWidth: 1,
    borderColor: "#32393f",
    borderRadius: 5,
    marginHorizontal: 8,
  },
  btnAdd: {
    alignItems: "center",
    justifyContent: "center",
    height: 38,
    backgroundColor: "#0f50d3",
    marginHorizontal: 8,
    marginVertical: 10,
    borderRadius: 5,
  },
  btnAddText: {
    color: "white",
    fontSize: 18,
  },
});
