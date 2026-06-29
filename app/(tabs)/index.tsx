import ItemComponent from "@/src/components/ItemComponent";
import { MovieContext } from "@/src/context/MovieContext";

import { useRouter } from "expo-router";
import { useContext } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();
  const context = useContext(MovieContext);
  if (!context) return null;
  const { allFilms } = context;

  return (
    <View style={styles.main}>
      <FlatList
        data={allFilms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemComponent film={item} />}
      />
      <TouchableOpacity
        style={styles.btnAdd}
        onPress={() => router.push("/addFilm")}
      >
        <Text style={styles.btnAddText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  btnAdd: {
    position: "absolute",
    right: 25,
    bottom: 25,
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: "#0c68d0",
  },
  btnAddText: {
    color: "white",
    fontSize: 30,
  },
});
