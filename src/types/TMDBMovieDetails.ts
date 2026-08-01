import { TMDBMovie } from "./tmdb";

export interface TMDBMovieDetails extends Omit<TMDBMovie, "genre_ids"> {
  genres: { id: number; name: string }[];
  runtime: number;
  origin_country: string[];
  backdrop_path: string | null;
}
