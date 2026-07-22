import ItemComponent from "@/src/components/ItemComponent";
import { AppTheme } from "@/src/constants/colors";
import { useDebounce } from "@/src/hooks/useDebounse";
import { useMovie } from "@/src/hooks/useMovie";
import { createStyles, useStyles } from "@/src/theme";
import { UserMovie } from "@/src/types/UserMovie";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState<UserMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounceSearchTerm = useDebounce(searchText, 700);

  const { styles } = useStyles(stylesheet);

  const searchMovies = async (text: string) => {
    if (text.length === 0) {
      setMovies([]);
      return;
    }
    setIsLoading(true);
    const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=uk-UA&query=${encodeURIComponent(text)}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Помилка:${response.status}`);
      const data = await response.json();
      setMovies(data.results || []);

      setIsLoading(false);
    } catch (e) {
      console.log("Помилка при звернені до сервера", e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    searchMovies(debounceSearchTerm);
  }, [debounceSearchTerm]);

  return (
    <View style={styles.main}>
      <TextInput
        style={styles.input}
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text);
        }}
        autoFocus={true}
      />

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ItemComponent film={item} />}
        style={styles.list}
        ListEmptyComponent={() => {
          // 1. Спочатку перевіряємо, чи введено взагалі щось
          if (searchText.length === 0) {
            return null;
          }

          // 2. Якщо текст є і зараз йде завантаження — показуємо лоадер
          if (isLoading) {
            return (
              <ActivityIndicator
                size="large"
                color="#1164d7"
                style={styles.loader}
              />
            );
          }

          // 3. Якщо ми пройшли перші дві умови, це означає: текст є, завантаження завершено,
          // а FlatList все одно викликав цей компонент (бо масив movies пустий).
          return <Text style={styles.text}>Нічого не знайдено...</Text>;
        }}
      />
    </View>
  );
}

const stylesheet = createStyles((theme) => ({
  main: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.border,
    marginHorizontal: 5,
    marginVertical: 15,
    backgroundColor: "#ecedee",
  },
  list: {
    // borderColor: "#44575c",
    marginHorizontal: 5,
    marginTop: 10,
    marginBottom: 50,
  },
  loader: {
    marginVertical: 10,
  },
  text: {
    color: theme.colors.text,
    fontSize: 16,
    marginLeft: 10,
  },
}));
