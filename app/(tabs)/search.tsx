import { AppTheme } from "@/src/Colors/colors";
import ItemComponent from "@/src/components/ItemComponent";
import { useDebounce } from "@/src/hooks/useDebounse";
import { useTheme } from "@/src/hooks/useTheme";
import { searchMovieApi } from "@/src/services/movies";
import { UserMovie } from "@/src/types/UserMovie";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState<UserMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounceSearchTerm = useDebounce(searchText, 700);
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const searchMovies = async (text: string) => {
    if (text.length === 0) {
      setMovies([]);
      return;
    }
    setIsLoading(true);
    try {
      const results = await searchMovieApi(text);
      setMovies(results || []);
    } catch (e) {
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };
  const handlerSearchClear = () => {
    setSearchText("");
    setMovies([]);
  };

  useEffect(() => {
    searchMovies(debounceSearchTerm);
  }, [debounceSearchTerm]);

  return (
    <View style={styles.main}>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="search" size={20} color="black" />

        <TextInput
          style={styles.input}
          placeholder="Знайти фільм..."
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
          }}
          autoFocus={true}
        />
        {searchText.length > 0 && (
          <TouchableOpacity
            onPress={handlerSearchClear}
            style={styles.iconClose}
          >
            <MaterialIcons name="close" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      {isLoading && (
        <ActivityIndicator
          size="large"
          color={theme.border}
          style={styles.loader}
        />
      )}

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ItemComponent film={item} />}
        style={styles.list}
        ListEmptyComponent={() => {
          if (searchText.length === 0) {
            return null;
          }
          return <Text style={styles.text}>Нічого не знайдено...</Text>;
        }}
      />
    </View>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: theme.background,
    },
    inputContainer: {
      flexDirection: "row",
      borderWidth: 1,
      borderRadius: 5,
      marginHorizontal: 5,
      marginVertical: 15,
      borderColor: theme.border,
      backgroundColor: "#ecedee",
      alignItems: "center",
      padding: 5,
    },
    input: {
      flex: 1,
      marginLeft: 3,
    },
    iconClose: {
      padding: 4,
    },
    list: {
      marginHorizontal: 5,
      marginTop: 10,
      marginBottom: 50,
    },
    loader: {
      marginVertical: 10,
    },
    text: {
      color: theme.text,
      fontSize: 16,
      marginLeft: 10,
    },
  });
