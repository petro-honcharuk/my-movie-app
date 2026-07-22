import { useMovieDetail } from "@/src/hooks/useMovieDetail.hook";
import {
  formatDate,
  formatMoney,
  formatRating,
  formatRuntime,
  formatYear,
  tmdbImage,
} from "@/src/utils/formats";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInDown, FadeInUp } from "react-native-reanimated";

type DetailPageParams = {
  movieId: string;
};

const BACKDROP_HEIGHT = 320;

export default function DetailPage() {
  const { movieId } = useLocalSearchParams<DetailPageParams>();
  const { width } = useWindowDimensions();
  const { data, isLoading, error } = useMovieDetail({ movieId });

  const posterWidth = Math.min(140, width * 0.36);
  const posterHeight = posterWidth * 1.5;

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Stack.Screen options={{ title: "Завантаження…" }} />
        <ActivityIndicator size="large" color="#e8b86d" />
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.centered}>
        <Stack.Screen options={{ title: "Помилка" }} />
        <Text selectable style={styles.errorText}>
          {error?.message ?? "Не вдалося завантажити фільм"}
        </Text>
      </View>
    );
  }

  const backdropUri = tmdbImage(data.backdrop_path, "w780");
  const posterUri = tmdbImage(data.poster_path, "w500");
  const rating = formatRating(data.vote_average);
  const year = formatYear(data.release_date);

  return (
    <>
      <Stack.Screen
        options={{
          title: data.title,
          headerStyle: { backgroundColor: "#0b0d12" },
          headerTintColor: "#f4f1ea",
          headerTitleStyle: { color: "#f4f1ea", fontWeight: "600" },
          contentStyle: {
            backgroundColor: "#0b0d12",
            paddingHorizontal: 0,
            paddingVertical: 0,
          },
        }}
      />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeIn.duration(500)} style={styles.hero}>
          {backdropUri ? (
            <Image
              source={{ uri: backdropUri }}
              style={styles.backdrop}
              contentFit="cover"
              transition={400}
            />
          ) : (
            <View style={[styles.backdrop, styles.backdropFallback]} />
          )}
          <View style={styles.backdropScrim} />
        </Animated.View>

        <View style={styles.body}>
          <Animated.View
            entering={FadeInUp.duration(450).delay(80)}
            style={[styles.titleRow, { marginTop: -(posterHeight * 0.55) }]}
          >
            <View
              style={[
                styles.posterWrap,
                { width: posterWidth, height: posterHeight },
              ]}
            >
              {posterUri ? (
                <Image
                  source={{ uri: posterUri }}
                  style={styles.poster}
                  contentFit="cover"
                  transition={350}
                />
              ) : (
                <View style={[styles.poster, styles.posterFallback]}>
                  <Text style={styles.posterFallbackText}>
                    Немає{"\n"}постера
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.titleBlock}>
              <Text selectable style={styles.title}>
                {data.title}
              </Text>
              {data.original_title !== data.title ? (
                <Text selectable style={styles.originalTitle}>
                  {data.original_title}
                </Text>
              ) : null}
              <Text style={styles.metaLine}>
                {[year, formatRuntime(data.runtime), data.status]
                  .filter(Boolean)
                  .join("  ·  ")}
              </Text>
              <View style={styles.ratingRow}>
                <Text style={styles.ratingStar}>★</Text>
                <Text style={styles.ratingValue}>{rating}</Text>
                <Text style={styles.ratingCount}>
                  ({data.vote_count.toLocaleString("uk-UA")})
                </Text>
              </View>
            </View>
          </Animated.View>

          {data.genres.length > 0 ? (
            <Animated.View
              entering={FadeInDown.duration(400).delay(140)}
              style={styles.genres}
            >
              {data.genres.map((genre) => (
                <View key={genre.id} style={styles.genreChip}>
                  <Text style={styles.genreText}>{genre.name}</Text>
                </View>
              ))}
            </Animated.View>
          ) : null}

          {data.tagline ? (
            <Animated.Text
              entering={FadeInDown.duration(400).delay(180)}
              selectable
              style={styles.tagline}
            >
              “{data.tagline}”
            </Animated.Text>
          ) : null}

          <Animated.View
            entering={FadeInDown.duration(400).delay(220)}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>Опис</Text>
            <Text selectable style={styles.overview}>
              {data.overview || "Опис відсутній."}
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(400).delay(280)}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>Інформація</Text>
            <View style={styles.infoGrid}>
              <InfoCell label="Прем’єра" value={formatDate(data.release_date)} />
              <InfoCell label="Тривалість" value={formatRuntime(data.runtime)} />
              <InfoCell
                label="Мова"
                value={
                  data.spoken_languages[0]?.name ||
                  data.original_language.toUpperCase()
                }
              />
              <InfoCell
                label="Країна"
                value={
                  data.production_countries.map((c) => c.name).join(", ") || "—"
                }
              />
              <InfoCell label="Бюджет" value={formatMoney(data.budget)} />
              <InfoCell label="Збори" value={formatMoney(data.revenue)} />
            </View>
          </Animated.View>

          {data.production_companies.length > 0 ? (
            <Animated.View
              entering={FadeInDown.duration(400).delay(340)}
              style={styles.section}
            >
              <Text style={styles.sectionTitle}>Студії</Text>
              <Text selectable style={styles.studios}>
                {data.production_companies.map((c) => c.name).join("  ·  ")}
              </Text>
            </Animated.View>
          ) : null}
        </View>
      </ScrollView>
    </>
  );
}

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoCell}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text selectable style={styles.infoValue}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#0b0d12",
  },
  scrollContent: {
    paddingBottom: 48,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0b0d12",
    padding: 24,
    gap: 12,
  },
  errorText: {
    color: "#f0c4c4",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
  hero: {
    height: BACKDROP_HEIGHT,
    width: "100%",
    overflow: "hidden",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  backdropFallback: {
    backgroundColor: "#1a2030",
  },
  backdropScrim: {
    ...StyleSheet.absoluteFillObject,
    experimental_backgroundImage:
      "linear-gradient(to bottom, rgba(11,13,18,0.15) 0%, rgba(11,13,18,0.35) 45%, rgba(11,13,18,1) 100%)",
  },
  body: {
    paddingHorizontal: 20,
    gap: 22,
  },
  titleRow: {
    flexDirection: "row",
    gap: 16,
    alignItems: "flex-end",
  },
  posterWrap: {
    borderRadius: 14,
    borderCurve: "continuous",
    overflow: "hidden",
    boxShadow: "0 12px 28px rgba(0,0,0,0.55)",
    backgroundColor: "#1a2030",
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  posterFallback: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1a2030",
  },
  posterFallbackText: {
    color: "#8b93a7",
    textAlign: "center",
    fontSize: 12,
    lineHeight: 16,
  },
  titleBlock: {
    flex: 1,
    gap: 6,
    paddingBottom: 4,
  },
  title: {
    color: "#f7f4ef",
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: -0.4,
    lineHeight: 30,
  },
  originalTitle: {
    color: "#9aa3b5",
    fontSize: 14,
    fontStyle: "italic",
  },
  metaLine: {
    color: "#b8c0d0",
    fontSize: 13,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  ratingStar: {
    color: "#e8b86d",
    fontSize: 16,
  },
  ratingValue: {
    color: "#f7f4ef",
    fontSize: 18,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
  },
  ratingCount: {
    color: "#8b93a7",
    fontSize: 13,
    fontVariant: ["tabular-nums"],
  },
  genres: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  genreChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(232, 184, 109, 0.12)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(232, 184, 109, 0.35)",
  },
  genreText: {
    color: "#e8b86d",
    fontSize: 13,
    fontWeight: "500",
  },
  tagline: {
    color: "#c5ccd9",
    fontSize: 16,
    fontStyle: "italic",
    lineHeight: 24,
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    color: "#f7f4ef",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  overview: {
    color: "#c5ccd9",
    fontSize: 16,
    lineHeight: 25,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  infoCell: {
    width: "47%",
    flexGrow: 1,
    gap: 4,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderCurve: "continuous",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.08)",
  },
  infoLabel: {
    color: "#8b93a7",
    fontSize: 12,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  infoValue: {
    color: "#f0f2f7",
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
  },
  studios: {
    color: "#c5ccd9",
    fontSize: 15,
    lineHeight: 22,
  },
});
