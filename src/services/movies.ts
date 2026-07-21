import { movieApi } from ".";
type SearchMovieByIdParams = {
  movieId: string;
};

export const getMovieById = async (params: SearchMovieByIdParams) => {
  try {
    const { data } = await movieApi.get(
      `/3/movie/${params.movieId}?api_key=${process.env.EXPO_PUBLIC_API_KEY}&language=uk-UA`,
    );
    return data;
  } catch (e) {
    console.error(e);
  }
};
