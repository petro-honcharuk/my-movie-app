import { createContext, useState } from "react";

interface MovieContextType {
  favorites: string[];
  toggleFavorites: (id: string) => void;
}
export const MovieContext = createContext<MovieContextType | undefined>(
  undefined,
);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const toggleFavorites = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((item) => item !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };
  return (
    <MovieContext.Provider value={{ favorites, toggleFavorites }}>
      {children}
    </MovieContext.Provider>
  );
};
