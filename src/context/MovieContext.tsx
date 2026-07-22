import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useMemo, useState } from "react";

import { MovieDetails } from "../types/UserMovie";

interface MovieContextType {
  movies: MovieDetails[];
  favoriteMovies: MovieDetails[];
  wantToWatchMovies: MovieDetails[];
  watchedMovies: MovieDetails[];
  toggleFavoriteMovie: (film: MovieDetails) => void;
  toggleWantToWatchMovie: (film: MovieDetails) => void;
  toggleWatchedMovie: (film: MovieDetails) => void;
}

export const MovieContext = createContext<MovieContextType | undefined>(
  undefined,
);

const getAsyncStorageData = async (key: string) => {
  const data = await AsyncStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [movies, setMovies] = useState<MovieDetails[]>([]);

  useEffect(() => {
    const loadingFilms = async () => {
      try {
        const movies = await getAsyncStorageData("movies");
        setMovies(movies);
      } catch (e) {
        console.log("Помилка завантаження фільмів", e);
      }
    };
    loadingFilms();
  }, []);

  const toggleFavoriteMovie = (movie: MovieDetails) => {
    const newMovies = movies.map((m) =>
      m.id === movie.id ? { ...m, isFavorite: !m.isFavorite } : m,
    );
    setMovies(newMovies);
    AsyncStorage.setItem("movies", JSON.stringify(newMovies));
  };

  const toggleWantToWatchMovie = (movie: MovieDetails) => {
    const newMovies = movies.map((m) =>
      m.id === movie.id ? { ...m, isWantToWatch: !m.isWantToWatch } : m,
    );
    setMovies(newMovies);
    AsyncStorage.setItem("movies", JSON.stringify(newMovies));
  };

  const toggleWatchedMovie = (movie: MovieDetails) => {
    const newMovies = movies.map((m) =>
      m.id === movie.id ? { ...m, isWatched: !m.isWatched } : m,
    );
    setMovies(newMovies);
    AsyncStorage.setItem("movies", JSON.stringify(newMovies));
  };

  const favoriteMovies = useMemo(
    () => movies.filter((m) => m.isFavorite),
    [movies],
  );

  const wantToWatchMovies = useMemo(
    () => movies.filter((m) => m.isWantToWatch),
    [movies],
  );

  const watchedMovies = useMemo(
    () => movies.filter((m) => m.isWatched),
    [movies],
  );

  return (
    <MovieContext.Provider
      value={{
        movies,
        favoriteMovies,
        wantToWatchMovies,
        watchedMovies,
        toggleFavoriteMovie,
        toggleWantToWatchMovie,
        toggleWatchedMovie,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
