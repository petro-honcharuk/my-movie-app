import { useEffect, useState } from "react";
import { MovieDetails } from "../types/UserMovie";
import { getMovieById } from "../services/movies";

export const useGetMovieDetails = ({ movieId }: { movieId: string }) => {
  const [data, setData] = useState<MovieDetails | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getMovieById({ movieId });
        setData(data);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  return { data, loading, error };
};
