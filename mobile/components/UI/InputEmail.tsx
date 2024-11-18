import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

export default function InputEmail({ form, setForm, error, isDark }: any) {
  return (
    <>
    <Text style={[styles.text]}>Email:</Text>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: isDark.border,
            color: isDark.text,
            backgroundColor: isDark.backgroundSecondary,
          },
        ]}
        textContentType="emailAddress"
        onChangeText={(e) => setForm({ ...form, email: e })}
      />
      {error.email && <Text style={styles.error}>Invalid email</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    padding: 8,
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
