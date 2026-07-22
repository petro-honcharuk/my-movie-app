import { useState, useEffect } from "react";

import { getMovieById } from "@/src/services/movies";
import { MovieDetailsResponse } from "@/src/services/types";

export const useMovieDetail = ({ movieId }: { movieId: string }) => {
  const [data, setData] = useState<MovieDetailsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getMovieById({ movieId }, controller.signal);
        setData(response || null);
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }
        setError(err as Error);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [movieId]);

  return {
    data,
    isLoading,
    error,
  };
};
