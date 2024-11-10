import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import axios from "axios";
import InputPassword from "@/components/UI/InputPassword";
import { validateEmail } from "@/functions/validateEmail";
import { Link, router } from "expo-router";
import { UserType } from "@/types/UserType";
import { validatePsw } from "@/functions/validatePsw";
import InputEmail from "@/components/UI/InputEmail";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const statusBarHeight = StatusBar.currentHeight ?? 0;

export default function SignUp() {
  const colorScheme = useColorScheme();
  const isDark = Colors[colorScheme ?? "light"];
  const [error, setError] = React.useState({
    email: false,
    password: false,
  });
  const [form, setForm] = React.useState<UserType>({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    company: "",
    avatar: "",
  });

  const handleForm = async () => {
    if (validateEmail(form.email)) {
      setError({ ...error, email: false });
      if (
        validatePsw(form.password) &&
        form.password === form.confirmPassword
      ) {
        setError({ ...error, password: false });
        const data = {
          email: form.email,
          password: form.password,
          fullName: form.fullName,
          phone: form.phone,
          company: form.company,
          avatar: form.avatar,
        };
        await axios
          .post(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/api/user/signup`, data)
          .then(() => router.replace("/auth/Login"))
          .catch((err) => setError({ ...error, email: true }));
      } else setError({ ...error, password: true, email: false });
    } else setError({ ...error, email: true, password: false });
  };
  return (
    <Animated.ScrollView
      contentContainerStyle={[styles.container]}
      alwaysBounceVertical
      keyboardShouldPersistTaps={"always"}
    >
      <Image source={require("@/assets/images/logo.png")} style={styles.logo} />
      <Animated.View style={styles.innerContainer}>
        <Text style={[styles.text, { color: isDark.text }]}>Full name:</Text>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: isDark.border,
              color: isDark.text,
              backgroundColor: isDark.backgroundSecondary,
            },
          ]}
          textContentType="name"
          onChangeText={(e) => setForm({ ...form, fullName: e })}
        />
        <InputEmail
          form={form}
          setForm={setForm}
          isDark={isDark}
          error={error}
        />
        <InputPassword
          label="password"
          form={form}
          setForm={setForm}
          error={error}
        />
        <InputPassword
          label="confirmPassword"
          form={form}
          setForm={setForm}
          error={error}
        />
        <Text style={[styles.text, { color: isDark.text }]}>Phone number:</Text>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: isDark.border,
              color: isDark.text,
              backgroundColor: isDark.backgroundSecondary,
            },
          ]}
          textContentType="telephoneNumber"
          onChangeText={(e) => setForm({ ...form, phone: e })}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={handleForm}
        >
          <Text style={[styles.textButton]}>Sign up</Text>
        </TouchableOpacity>
        <Text>
          Already have an account?{" "}
          <Link style={styles.link} href="/auth/Login">
            Log in
          </Link>
        </Text>
      </Animated.View>
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
    flex: 1,
    padding: 25,
    gap: 10,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
  },
  text: {
    fontFamily: "Poppins_600SemiBold_Italic",
    fontSize: 12,
    letterSpacing: 3,
    alignSelf: "flex-start",
    bottom: -8,
  },
  textButton: {
    fontFamily: "Poppins_600SemiBold_Italic",
    fontSize: 14,
    letterSpacing: 2,
    alignSelf: "center",
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    padding: 8,
  },
  button: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#22a6f1",
    marginTop: 10,
  },
  logo: {
    width: 150,
    height: 150,
    top: -50,
    alignSelf: "center",
  },
  link: {
    color: "#22a6f1",
    textDecorationLine: "underline",
  },
});
