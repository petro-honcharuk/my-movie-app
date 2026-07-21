export const themes = {
  light: {
    background: "#f8f9fa", // м'який світлий фон екрана (замість чисто білого)
    cardBackground: "#ffffff", // білий фон для карток фільмів
    text: "#1c1c1e", // майже чорний текст
    textMuted: "#8e8e93", // сірий текст для опису/жанрів
    border: "#ececec", // світла лінія розділювача
  },
  dark: {
    background: "#243147", // глибокий темно-синій/вугільний кінофон
    cardBackground: "#182031", // трохи світліший сіро-синій фон для карток
    text: "#ffffff", // чистий білий текст
    textMuted: "#9ca3af", // світло-сірий текст для опису
    border: "#263143", // темна лінія розділювача
  },
};
export type AppTheme = typeof themes.light;
