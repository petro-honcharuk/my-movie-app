import { AppTheme } from "@/src/Colors/colors";
import { useTheme } from "@/src/hooks/useTheme";
import React from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

export default function SettingScreen() {
  const { isDarkMode, toggleTheme, theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.main}>
      <View style={styles.row}>
        <Text style={styles.text}>Змінити тему</Text>
        <Switch
          style={styles.switch}
          trackColor={{ false: "#767577", true: "#d2d7df" }}
          thumbColor={isDarkMode ? "#4617e0" : "#f4f3f4"}
          value={isDarkMode}
          onValueChange={toggleTheme}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Очистити сховище</Text>
        <TouchableOpacity style={styles.btnClear}>
          <Text style={styles.btnText}>Очистити</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: theme.background,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      height: 60,
      alignItems: "center",
      marginVertical: 10,
      marginHorizontal: 8,
      marginTop: 10,
      backgroundColor: theme.cardBackground,
      borderRadius: 8,
      padding: 5,
    },
    text: {
      color: theme.text,
      fontSize: 18,
    },
    switch: {
      marginRight: 10,
      height: 40,
      width: 80,
    },
    btnClear: {
      width: 80,
      height: 40,
      marginRight: 10,
      backgroundColor: "#d03737",
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    btnText: {
      color: theme.text,
      fontSize: 14,
      margin: 5,
    },
  });
