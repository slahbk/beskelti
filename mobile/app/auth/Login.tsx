import {
  ActivityIndicator,
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
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import InputEmail from "@/components/UI/InputEmail";
import InputPassword from "@/components/UI/InputPassword";
import { Link, router } from "expo-router";
import { validateEmail } from "@/functions/validateEmail";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async () => {
    if (validateEmail(form.email)) {
      setError({ ...error, email: false });
      setIsLoading(true);
      await axios
        .post(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/api/auth/login`, form)
        .then(async (res) => {
          await AsyncStorage.setItem("token", res.data.access_token);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.access_token}`;
          router.replace("/(tabs)/Post");
        })
        .catch((err) => {
          setIsLoading(false);
          setError({ ...error, email: true });
        });
    } else {
      setIsLoading(false);
      setError({ ...error, email: true });
    }
  };
  return (
    <Animated.ScrollView
      contentContainerStyle={[styles.container]}
      alwaysBounceVertical
      keyboardShouldPersistTaps={"always"}
    >
      <Image source={require("@/assets/images/logo.png")} style={styles.logo} />
      <View style={styles.innerContainer}>
        <InputEmail
          label="email"
          isDark={isDark}
          error={error}
          form={form}
          setForm={setForm}
        />
        <InputPassword
          label="password"
          error={error}
          form={form}
          setForm={setForm}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={[styles.textButton]}>
            {isLoading ? <ActivityIndicator size={"small"} /> : "Login"}
          </Text>
        </TouchableOpacity>
        <Text>
          Don't have an account?{" "}
          <Link style={styles.link} href="/auth/SignUp">
            Sign Up
          </Link>
        </Text>
      </View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT + statusBarHeight,
    paddingTop: SCREEN_HEIGHT * 0.1,
    width: SCREEN_WIDTH,
    paddingHorizontal: SCREEN_WIDTH * 0.08,
    backgroundColor: "#081526",
  },
  innerContainer: {
    padding: 25,
    gap: 10,
    backgroundColor: "#fff",
    borderRadius: 30,
    alignItems: "center",
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
  logo: {
    width: 150,
    height: 150,
    top: -50,
    alignSelf: "center",
  },
});
