import { AppTheme } from "@/src/Colors/colors";
import { useMovie } from "@/src/hooks/useMovie";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
  const { theme } = useMovie();
  const styles = getStyles(theme);

  return (
    <View style={styles.main}>
      <Text style={styles.text}>Версія додатка: версія 1.0.0</Text>
      <Text style={styles.text}>
        Про додаток: Цей додаток створено для зручного ведення щоденника
        переглянутого кіно
      </Text>
      <Text style={styles.text}>
        Подяка: This product uses the TMDB API but is not endorsed or certified
        by TMDB
      </Text>
    </View>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: theme.background,
    },
    text: {
      marginVertical: 10,
      marginHorizontal: 8,
      color: theme.text,
      fontSize: 18,
      backgroundColor: theme.cardBackground,
      borderBottomColor: theme.border,
      borderRadius: 8,
      padding: 5,
    },
  });
