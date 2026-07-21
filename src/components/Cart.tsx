import { useRouter } from "expo-router";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AppTheme } from "../Colors/colors";
import { useMovie } from "../hooks/useMovie";
import { MovieListType } from "../types/UserMovie";

type Props = {
  title: string;
  listType: MovieListType;
};

export default function Cart({ title, listType }: Props) {
  const router = useRouter();
  const { theme } = useMovie();
  const styles = getStyles(theme);

  const handlePress = () => {
    router.push({
      pathname: "/movieGrid",
      params: {
        listType: listType,
        title: title,
      },
    });
  };
  return (
    <TouchableOpacity style={styles.btnCard} onPress={handlePress}>
      <ImageBackground
        source={require("@/assets/images/fon2.jpg")}
        style={styles.fonImage}
      >
        <View>
          <Text style={styles.cardText}>{title}:</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    btnCard: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: theme.border,
      backgroundColor: theme.cardBackground,
      height: 100,
      marginHorizontal: 5,
      marginVertical: 5,
    },
    cardText: {
      marginHorizontal: 10,
      marginVertical: 5,
      fontSize: 22,
      fontWeight: "bold",
      color: theme.text,
    },
    fonImage: {
      height: "100%",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
  });
