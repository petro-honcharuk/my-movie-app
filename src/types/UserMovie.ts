type MovieStatus = "watched" | "watchlist" | "dropped" | "rewatch";
export interface UserMovie {
  id: number;
  title: string;
  genre_ids: number[];
  vote_average: number;
  poster_path: string | null;
  isFavorite?: boolean;
  status?: MovieStatus;
  watchCount?: number;
  userNotes?: string;
  release_date: string;
  runtime?: number;
}
export type MovieListType = "watched" | "wantToWatch" | "favorites";
export type HomeStackParamList = {
  Home: undefined; // Параметри не потрібні
  Search: undefined; // Параметри не потрібні
  MovieGrid: {
    listType: MovieListType; // Передаємо тип списку (що саме показувати)
    title: string; // Заголовок екрана (напр. "Мої улюблені")
  };
  MovieDetails: {
    movieId: number; // Обов'язковий ID фільму для запиту до API
  };
};
