import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { MovieResult } from "@/src/services/types";
import {
  formatRating,
  formatYear,
  tmdbImage,
} from "@/src/utils/formats";

export const SearchMovieItem = ({
  title,
  id,
  poster_path,
  overview,
  release_date,
  vote_average,
  vote_count,
  original_title,
}: MovieResult) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/detail",
      params: {
        movieId: id.toString(),
      },
    });
  };

  const posterUri = tmdbImage(poster_path, "w500");
  const year = formatYear(release_date);
  const rating = formatRating(vote_average);

  return (
    <Animated.View entering={FadeInDown.duration(320)}>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          styles.container,
          pressed && styles.containerPressed,
        ]}
      >
        <View style={styles.posterWrap}>
          {posterUri ? (
            <Image
              source={{ uri: posterUri }}
              style={styles.poster}
              contentFit="cover"
              transition={250}
            />
          ) : (
            <View style={[styles.poster, styles.posterFallback]}>
              <Text style={styles.posterFallbackText}>Немає{"\n"}постера</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>

          {original_title !== title ? (
            <Text style={styles.originalTitle} numberOfLines={1}>
              {original_title}
            </Text>
          ) : null}

          <Text style={styles.meta}>
            {year}
            {"  ·  "}
            <Text style={styles.ratingStar}>★</Text> {rating}
            <Text style={styles.voteCount}>
              {" "}
              ({vote_count.toLocaleString("uk-UA")})
            </Text>
          </Text>

          {overview ? (
            <Text style={styles.overview} numberOfLines={3}>
              {overview}
            </Text>
          ) : null}
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 14,
    padding: 12,
    borderRadius: 16,
    borderCurve: "continuous",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.08)",
  },
  containerPressed: {
    backgroundColor: "rgba(255,255,255,0.08)",
    transform: [{ scale: 0.985 }],
  },
  posterWrap: {
    width: 84,
    height: 126,
    borderRadius: 12,
    borderCurve: "continuous",
    overflow: "hidden",
    backgroundColor: "#1a2030",
    boxShadow: "0 8px 18px rgba(0,0,0,0.4)",
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  posterFallback: {
    alignItems: "center",
    justifyContent: "center",
  },
  posterFallbackText: {
    color: "#8b93a7",
    textAlign: "center",
    fontSize: 11,
    lineHeight: 14,
  },
  content: {
    flex: 1,
    gap: 5,
    justifyContent: "center",
    paddingVertical: 2,
  },
  title: {
    color: "#f7f4ef",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: -0.2,
    lineHeight: 22,
  },
  originalTitle: {
    color: "#9aa3b5",
    fontSize: 13,
    fontStyle: "italic",
  },
  meta: {
    color: "#b8c0d0",
    fontSize: 13,
    marginTop: 2,
  },
  ratingStar: {
    color: "#e8b86d",
  },
  voteCount: {
    color: "#8b93a7",
    fontVariant: ["tabular-nums"],
  },
  overview: {
    color: "#9aa3b5",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
});
