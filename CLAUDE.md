# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Expo version

This project targets **Expo SDK 54** with the New Architecture enabled (`newArchEnabled: true`), React Native 0.81, React 19. Expo APIs change between SDK versions — consult the versioned docs at https://docs.expo.dev/versions/v54.0.0/ before writing Expo-specific code.

## Commands

```bash
npm install          # install dependencies
npm start            # expo start (dev server, choose platform interactively)
npm run ios          # expo start --ios
npm run android      # expo start --android
npm run web          # expo start --web
npm run lint         # expo lint (ESLint via eslint-config-expo)
```

There is no test runner configured in this project.

`npm run reset-project` is the create-expo-app scaffolding script — it moves `app/` into `app-example/` and blanks the app. **Do not run it**; it will wipe the real code.

## Environment

The app reads TMDB (The Movie Database) credentials from `.env` — both must be present at runtime:

- `EXPO_PUBLIC_API_URL` — TMDB base URL (e.g. `https://api.themoviedb.org`)
- `EXPO_PUBLIC_API_KEY` — TMDB API key

`EXPO_PUBLIC_`-prefixed vars are inlined into the client bundle by Expo and are accessed directly via `process.env.EXPO_PUBLIC_*`.

## Architecture

**Routing** — Expo Router, file-based. `app/_layout.tsx` is the root `Stack`; `app/(tabs)/` is the bottom-tab group (`index` = Home, `setting`). Other top-level screens (`search`, `movieGrid`, `detailsScreen`, `statisticScreen`, `settingScreen`, `about`) are stack routes registered in the root layout. Path alias `@/*` maps to the repo root (see `tsconfig.json`), so imports look like `@/src/hooks/useMovie`.

**Global state** — a single React Context, `src/context/MovieContext.tsx`, wrapping the whole app in the root layout. It owns three user lists (`favorites`, `isWatched`, `isWantToWatch`), each toggled by an add-or-remove-by-`id` function, plus dark-mode state. Consume it **only** through the `useMovie()` hook (`src/hooks/useMovie.ts`), which throws if used outside the provider. When adding shared state, extend this context rather than introducing a new store.

**Persistence** — `@react-native-async-storage/async-storage`. The context loads all lists + theme on mount and writes back on every toggle. Storage keys are string literals: `my_favorites`, `my_want_to_watch`, `my_watched_films`, `userTheme`. Reuse these exact keys; changing one orphans existing user data.

**Theming** — there are **two parallel theme sources that must be kept in sync**:
1. `src/constants/colors.ts` — `themes.light` / `themes.dark` (`AppTheme`), used for in-screen component styles. Screens build styles with a `getStyles(theme)` factory and pull `theme` from `useMovie()`.
2. `navigationLightTheme` / `navigationDarkTheme` in `MovieContext.tsx` — React Navigation `Theme` objects for the header/tab-bar chrome, applied via `ThemeProvider` in the root layout.

Toggling dark mode flips both. When adjusting colors, update the corresponding source(s).

**Data fetching** — TMDB, two coexisting patterns:
- `src/services/` — an `axios` instance (`movieApi`, base URL from env) with typed functions like `getMovieById`. Prefer this for new endpoints.
- Raw `fetch` inline in screens (e.g. `app/search.tsx` builds the search URL directly).

TMDB requests append `api_key=${EXPO_PUBLIC_API_KEY}&language=uk-UA`. Search is debounced via the `useDebounce` hook (`src/hooks/useDebounse.ts` — note the filename spelling).

**Domain types** — `src/types/UserMovie.ts` (`UserMovie` mirrors the TMDB movie shape plus user fields) and `Genres.ts`.

## Conventions

- Code comments and user-facing strings are written in **Ukrainian**. Match this when editing existing files.
- Screens are default-exported function components; styles live at the bottom of the file, either as a plain `StyleSheet.create` or a `getStyles(theme)` factory for theme-aware screens.
