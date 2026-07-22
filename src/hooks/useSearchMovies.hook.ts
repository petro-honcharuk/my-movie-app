import { useState, useEffect } from "react";

import { getMoviesByName } from "@/src/services/movies";
import { MovieResult } from "@/src/services/types";

export const useSearchMovies = ({ searchQuery }: { searchQuery: string }) => {
  const [data, setData] = useState<MovieResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (searchQuery.length === 0) {
      setData([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getMoviesByName(searchQuery, controller.signal);
        setData(response?.results || []);
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
  }, [searchQuery]);

  return {
    data,
    isLoading,
    error,
  };
};
