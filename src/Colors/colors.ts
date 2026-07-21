export const themes = {
  light: {
    background: "#cac0b8", // м'який світлий фон екрана (замість чисто білого)
    cardBackground: "#bebaaa", // білий фон для карток фільмів
    text: "#0f0f11", // майже чорний текст
    textMuted: "#5d5d61", // сірий текст для опису/жанрів
    border: "#ececec", // світла лінія розділювача
  },
  dark: {
    background: "#243147", // глибокий темно-синій/вугільний кінофон
    cardBackground: "#182031", // трохи світліший сіро-синій фон для карток
    text: "#ffffff", // чистий білий текст
    textMuted: "#dde4f0", // світло-сірий текст для опису
    border: "#263143", // темна лінія розділювача
  },
};
export type AppTheme = typeof themes.light;
