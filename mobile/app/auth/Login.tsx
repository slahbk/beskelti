import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import InputEmail from "@/components/UI/InputEmail";
import InputPassword from "@/components/UI/InputPassword";
import { Link } from "expo-router";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const statusBarHeight = StatusBar.currentHeight ?? 0;

export default function Login() {
  const colorScheme = useColorScheme();
  const isDark = Colors[colorScheme ?? "light"];
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });
  const [error, setError] = React.useState({
    email: false,
  });
  return (
    <Animated.ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: isDark.background },
      ]}
    >
      <InputEmail isDark={isDark} error={error} form={form} setForm={setForm} />
      <InputPassword
        label="password"
        error={error}
        form={form}
        setForm={setForm}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={[styles.textButton]}>Login</Text>
      </TouchableOpacity>
      <Text>
        Don't have an account?{" "}
        <Link style={styles.link} href="/auth/SignUp">
          Sign Up
        </Link>
      </Text>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: SCREEN_HEIGHT,
    paddingTop: statusBarHeight,
    alignItems: "center",
    gap: 10,
    width: SCREEN_WIDTH,
    paddingHorizontal: SCREEN_WIDTH * 0.05,
  },
  button: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#22a6f1",
    marginTop: 10,
  },
  textButton: {
    fontFamily: "Poppins_600SemiBold_Italic",
    fontSize: 14,
    letterSpacing: 2,
    alignSelf: "center",
    color: "#fff",
  },
  link: {
    color: "#22a6f1",
    textDecorationLine: "underline",
  },
});
