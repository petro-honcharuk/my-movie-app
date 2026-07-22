import { SearchMovieItem } from "@/src/components/SearchMovieItem";
import { useSearchMovies } from "@/src/hooks/useSearchMovies.hook";
import { MovieResult } from "@/src/services/types";
import { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  FlatList,
  Text,
  RefreshControl,
  ActivityIndicator,
  ListRenderItemInfo,
} from "react-native";

export default function SearchPage() {
  const [searchText, setSearchText] = useState("");

  const { data, isLoading, error } = useSearchMovies({
    searchQuery: searchText,
  });

  const renderMovieItem = ({ item }: ListRenderItemInfo<MovieResult>) => {
    return <SearchMovieItem {...item} />;
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text selectable style={styles.errorText}>
          Error: {error.message}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Пошук фільмів…"
        placeholderTextColor="#8b93a7"
        style={styles.searchInput}
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={data}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {searchText ? "Фільмів не знайдено" : "Почніть пошук"}
          </Text>
        }
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            tintColor="#e8b86d"
            onRefresh={() => {
              setSearchText("");
              setSearchText(searchText);
            }}
          />
        }
        ListFooterComponent={
          isLoading ? (
            <ActivityIndicator size="large" color="#e8b86d" />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0d12",
    gap: 12,
  },
  searchInput: {
    height: 44,
    borderRadius: 12,
    borderCurve: "continuous",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(255,255,255,0.05)",
    color: "#f7f4ef",
    paddingHorizontal: 14,
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 24,
    flexGrow: 1,
  },
  separator: {
    height: 10,
  },
  emptyText: {
    color: "#8b93a7",
    textAlign: "center",
    marginTop: 40,
    fontSize: 15,
  },
  errorText: {
    color: "#f0c4c4",
    textAlign: "center",
  },
});
