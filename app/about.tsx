import { createStyles, useStyles } from "@/src/theme";
import { Text, View } from "react-native";

export default function AboutScreen() {
  const { styles } = useStyles(stylesheet);

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

const stylesheet = createStyles((theme) => ({
  main: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  text: {
    marginVertical: 10,
    marginHorizontal: 8,
    color: theme.colors.text,
    fontSize: 18,
    backgroundColor: theme.colors.cardBackground,
    borderBottomColor: theme.colors.border,
    borderRadius: 8,
    padding: 5,
  },
}));
