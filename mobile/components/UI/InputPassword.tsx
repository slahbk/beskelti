import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export default function InputPassword({ form, setForm, label, error }: any) {
  const colorScheme = useColorScheme();
  const isDark = Colors[colorScheme ?? "light"];
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Text style={[styles.text]}>
        {label === "password" ? "Password" : "Confirm Password"}
      </Text>
      <View style={styles.container}>
        <Ionicons
          name={form[label] ? "key" : "key-outline"}
          size={20}
          color={
            form[label]
              ? colorScheme === "light"
                ? "#555"
                : "#ccc"
              : "#b5b5b5"
          }
          style={{ position: "absolute", zIndex: 10, marginLeft: 6 }}
        />
        <Ionicons
          onPress={() => setVisible(!visible)}
          name={visible ? "eye-off" : "eye"}
          size={20}
          color={"#555"}
          style={{ position: "absolute", zIndex: 10, marginRight: 6, right: 0 }}
        />
        <TextInput
          style={[
            styles.input,
            {
              borderColor:
                label === "confirmPassword"
                  ? form.password === form.confirmPassword
                    ? isDark.border
                    : "red"
                  : isDark.border,
              color: isDark.text,
              backgroundColor: isDark.backgroundSecondary,
            },
          ]}
          passwordRules={"minLength: 8, required"}
          textContentType="password"
          secureTextEntry={visible}
          onChangeText={(e) => setForm({ ...form, [label]: e })}
        />
      </View>
      {error[label] && <Text style={styles.error}>Invalid password</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 32,
  },
  text: {
    color: "#000",
    fontFamily: "Poppins_600SemiBold_Italic",
    fontSize: 12,
    letterSpacing: 3,
    alignSelf: "flex-start",
    bottom: -8,
  },
  error: {
    color: "#ff0000",
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    letterSpacing: 1,
    marginTop: -5,
    alignSelf: "flex-start",
  },
});
