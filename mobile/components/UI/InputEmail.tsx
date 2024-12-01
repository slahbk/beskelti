import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function InputEmail({
  label,
  form,
  setForm,
  error,
  isDark,
}: any) {
  const email = form.email ? "mail" : "mail-outline";
  const fullname = form.fullName ? "person" : "person-outline";
  const phone = form.phone ? "call" : "call-outline";
  return (
    <>
      <Text style={[styles.text]}>
        {label === "email"
          ? "Email"
          : label === "fullName"
          ? "Full Name"
          : "Phone number"}
        :
      </Text>
      <View style={styles.container}>
        <Ionicons
          name={
            label === "email" ? email : label === "fullName" ? fullname : phone
          }
          size={20}
          color={form[label] ? "#555" : "#b5b5b5"}
          style={{ position: "absolute", zIndex: 10, marginLeft: 6 }}
        />
        <TextInput
          style={[
            styles.input,
            {
              borderColor: isDark.border,
              color: isDark.text,
              backgroundColor: isDark.backgroundSecondary,
            },
          ]}
          inlineImagePadding={50}
          textContentType={label === "email" ? "emailAddress" : "name"}
          onChangeText={(e) => setForm({ ...form, [label]: e })}
        />
      </View>
      {error[label] && <Text style={styles.error}>Invalid {label}</Text>}
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
