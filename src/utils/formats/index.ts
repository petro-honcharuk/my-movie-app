export function tmdbImage(
  path: string | null | undefined,
  size: "w500" | "w780" = "w500",
) {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export function formatRuntime(minutes: number) {
  if (!minutes) return "—";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins} хв`;
  return `${hours} год ${mins} хв`;
}

export function formatMoney(value: number) {
  if (!value) return "—";
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatDate(date: string) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function formatYear(date: string) {
  if (!date) return "—";
  return date.slice(0, 4);
}

export function formatRating(value: number) {
  return value.toFixed(1);
}
