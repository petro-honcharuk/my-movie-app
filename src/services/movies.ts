import { movieApi } from ".";

import {
  GenresResponse,
  SearchMovieResponse,
  MovieDetailsResponse,
} from "./types";

type SearchMovieByIdParams = {
  movieId: string;
};

export const getMovieById = async (
  params: SearchMovieByIdParams,
  signal?: AbortSignal,
) => {
  try {
    const { data } = await movieApi.get<MovieDetailsResponse>(
      `/movie/${params.movieId}`,
      {
        signal,
      },
    );
    return data;
  } catch (e) {
    if (signal?.aborted) {
      throw e;
    }
    console.error(e);
  }
};

export const getGenres = async () => {
  try {
    const { data } = await movieApi.get<GenresResponse>(`/genre/movie/list`);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getMoviesByName = async (query: string, signal?: AbortSignal) => {
  try {
    const { data } = await movieApi.get<SearchMovieResponse>(`/search/movie`, {
      params: { query },
      signal,
    });

    return data;
  } catch (e) {
    if (signal?.aborted) {
      throw e;
    }
    console.error(e);
  }
};
