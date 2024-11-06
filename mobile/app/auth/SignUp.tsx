import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import axios from "axios";
import InputPassword from "@/components/UI/InputPassword";
import { validateEmail } from "@/functions/validateEmail";
import { router } from "expo-router";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function SignUp() {
  const colorScheme = useColorScheme();
  const isDark = Colors[colorScheme ?? "light"];
  const [error, setError] = React.useState("");
  const [form, setForm] = React.useState({
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
      if (form.password === form.confirmPassword) {
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
          .catch((err) => console.error(err));
      }
    }
  };
  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      automaticallyAdjustKeyboardInsets
      keyboardShouldPersistTaps="always"
      contentContainerStyle={[
        styles.container,
        { backgroundColor: isDark.background },
      ]}
      scrollEnabled={false}
    >
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
        onChangeText={(e) => setForm({ ...form, fullName: e })}
      />
      <Text style={[styles.text, { color: isDark.text }]}>Email:</Text>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: isDark.border,
            color: isDark.text,
            backgroundColor: isDark.backgroundSecondary,
          },
        ]}
        onChangeText={(e) => setForm({ ...form, email: e })}
      />
      <Text style={[styles.text, { color: isDark.text }]}>Password:</Text>
      <InputPassword name="password" form={form} setForm={setForm} />
      <Text style={[styles.text, { color: isDark.text }]}>
        Confirm password:
      </Text>
      <InputPassword name="confirmPassword" form={form} setForm={setForm} />
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
        onChangeText={(e) => setForm({ ...form, phone: e })}
      />
      <TouchableOpacity style={styles.button} onPress={handleForm}>
        <Text style={[styles.textButton]}>Sign up</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
    gap: 10,
    width: SCREEN_WIDTH,
    paddingHorizontal: SCREEN_WIDTH * 0.05,
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
});
