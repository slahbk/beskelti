import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export default function ButtonFilterSearch({
  filterBy,
  setFilterBy,
  label,
}: any) {
  const colorScheme = useColorScheme();
  const isDark = Colors[colorScheme ?? "light"];
  const buutonBackgroundColor = colorScheme === "light" ? "#5fccfd" : "#17809e";

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          width: "auto",
          height: "auto",
          backgroundColor:
            filterBy === label
              ? buutonBackgroundColor
              : isDark.backgroundSecondary,
        },
      ]}
      onPress={() => setFilterBy(label)}
      activeOpacity={0.8}
    >
      <Text style={[{ color: isDark.text }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 0.7,
    borderColor: "#b5b5b5",
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
});
