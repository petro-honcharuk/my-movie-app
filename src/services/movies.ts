import { movieApi } from ".";

import {
  GenresResponse,
  SearchMovieResponse,
  MovieDetails,
} from "../types/UserMovie";

type SearchMovieByIdParams = {
  movieId: string;
};

export const getMovieById = async (params: SearchMovieByIdParams) => {
  try {
    const { data } = await movieApi.get<MovieDetails>(
      `/3/movie/${params.movieId}`,
    );
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getGenres = async () => {
  try {
    const { data } = await movieApi.get<GenresResponse>(`/3/genre/movie/list`);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const searchMovies = async (query: string) => {
  try {
    const { data } = await movieApi.get<SearchMovieResponse>(
      `/3/search/movie`,
      { params: { query } },
    );
    return data;
  } catch (e) {
    console.error(e);
  }
};
