export interface TMDBMovie {
  id: number;
  title: string; // Назва фільму
  original_title: string; // Оригінальна назва
  overview: string; // Опис/синопсис фільму
  poster_path: string | null; // Шлях до вертикального постера
  backdrop_path: string | null; // Шлях до горизонтального банера (треба для деталей)
  release_date: string; // Дата релізу (наприклад, "2026-03-24")
  vote_average: number; // Рейтинг фільму (наприклад, 7.8)
  vote_count: number; // Кількість голосів
  genre_ids: number[]; // ID жанрів фільму
}
