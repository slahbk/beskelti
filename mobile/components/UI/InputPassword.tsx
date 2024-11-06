import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export default function InputPassword({ form, setForm, name }: any) {
  const colorScheme = useColorScheme();
  const isDark = Colors[colorScheme ?? "light"];
  const [visible, setVisible] = React.useState(false);

  return (
    <View style={{ width: "100%", position: "relative" }}>
      <TextInput
        style={[
          styles.input,
          {
            borderColor:
              name === "confirmPassword"
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
        onChangeText={(e) => setForm({ ...form, [name]: e })}
      />
      <Ionicons
        onPress={() => setVisible(!visible)}
        name={visible ? "eye-off" : "eye"}
        size={20}
        color={isDark.text}
        style={{
          position: "absolute",
          right: 10,
          top: "50%",
          transform: [{ translateY: -10 }],
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    padding: 8,
  },
});
