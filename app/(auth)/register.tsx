import "react-native-url-polyfill/auto";

import { supabase } from "@/src/services/supabase";

import { AuthErrorsMessage } from "@/src/types/Auth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AppRegistred() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<AuthErrorsMessage>({});
  const singUpWithEmail = async () => {
    setErrors({});
    const localErrors: AuthErrorsMessage = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      localErrors.email = "Емейл є обов'язковим полем";
    } else if (!emailRegex.test(email)) {
      localErrors.email = "Некоректний формат емейлу";
    }

    if (!password.trim()) {
      localErrors.password = "Пароль є обов'язковим полем";
    } else if (password.length < 6) {
      localErrors.password = "Пароль має містити не менше 6 символів";
    }
    if (!name.trim()) {
      localErrors.password = "Імя користувача є обов'язковим полем";
    } else if (password.length < 6) {
      localErrors.name = "Імя має містити не менше 6 символів";
    }
    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);
      setLoading(false);
      return;
    }
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            display_name: name,
          },
        },
      });
      if (error) {
        setErrors({ general: error.message });
        setLoading(false);
        return;
      }
      await supabase.auth.signOut();

      Alert.alert("Успіх", "Акаунт успішно створений, тепер ви можете ввійти");
      router.replace("/login");
    } catch (error) {
      setErrors({ general: "Помилка з'єднання з сервером" });
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.label}>Емейл</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Пароль</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        {errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Імя користувача</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          keyboardType="default"
          autoCapitalize="none"
        />
        {errors.name ? (
          <Text style={styles.errorText}>{errors.name}</Text>
        ) : null}
      </View>
      {errors.general ? (
        <Text style={styles.errorText}>{errors.general}</Text>
      ) : null}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={singUpWithEmail}
      >
        <Text style={styles.buttonText}>Створити акаунт</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.buttonText}>На сторінку входу</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#86939e",
    marginBottom: 6,
    marginLeft: "3%",
  },
  input: {
    width: "96%",
    borderWidth: 1,
    borderColor: "#86939e",
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    marginLeft: "2%",
  },
  button: {
    backgroundColor: "#2089dc",
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
    width: "96%",
    marginLeft: "2%",
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  errorText: {
    marginVertical: 8,
    marginLeft: 10,
    fontSize: 14,
    color: "red",
  },
  successText: {
    color: "black",
    marginVertical: 8,
    marginLeft: 10,
    fontSize: 14,
  },
});
