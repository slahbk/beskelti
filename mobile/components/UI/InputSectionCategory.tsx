import { StyleSheet } from "react-native";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import RNPickerSelect from "react-native-picker-select";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function InputSectionCategory({ data, setData }: any) {
  const isDark = Colors[useColorScheme() ?? "light"];
  const selection = {
    section: [
      { label: "Bikes", value: "Bikes" },
      { label: "Accessories", value: "Accessories" },
      { label: "Tools", value: "Tools" },
    ],
    categoryBikes: [
      { label: "Normal", value: "normal" },
      { label: "Electric", value: "electric" },
    ],
  };

  return (
    <Animated.View
      entering={FadeInDown}
      style={[styles.container, { borderColor: isDark.border }]}
    >
      <RNPickerSelect
        onValueChange={(value: any) => setData({ ...data, section: value })}
        items={selection.section}
        value={data.section}
        placeholder={{ label: "Choose Section", value: null }}
      />
      {data.section === "Bikes" && (
        <RNPickerSelect
          onValueChange={(value: any) => setData({ ...data, category: value })}
          items={selection.categoryBikes}
          value={data.category}
          placeholder={{ label: "Choose Category", value: null }}
        />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    borderWidth: 1,
    borderRadius: 8,
  }
});
