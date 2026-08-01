import { movieApi } from ".";
import { TMDBMovie } from "../types/tmdb";
type SearchMovieByIdParams = {
  movieId: string;
};

export const getMovieById = async (params: SearchMovieByIdParams) => {
  try {
    const { data } = await movieApi.get(`3/movie/${params.movieId}`);
    return data;
  } catch (e) {
    console.error(e);
  }
};
export const getMovieByCategory = async (
  category: string,
): Promise<TMDBMovie[] | undefined> => {
  try {
    const { data } = await movieApi.get(`3/movie/${category}`);
    return data.results;
  } catch (e: any) {
    console.error("Помилка TMDB запиту:", e.response?.data || e.message);
  }
};

export const searchMovieApi = async (query: string) => {
  try {
    const { data } = await movieApi.get("/3/search/movie", {
      params: { query: query },
    });
    return data.results;
  } catch (e) {
    console.error("Search error ", e);
    return [];
  }
};
