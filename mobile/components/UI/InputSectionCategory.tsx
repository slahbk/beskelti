import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import RNPickerSelect from "react-native-picker-select";
import Animated, { FadeInDown } from "react-native-reanimated";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function InputSectionCategory({ data, setData }: any) {
  const isDark = Colors[useColorScheme() ?? "light"];
  const select = {
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
    <View style={{ width: "100%" }}>
      <Text
        style={{
          color: isDark.text,
          alignSelf: "flex-start",
          left: SCREEN_WIDTH * 0.08,
          marginBottom: 5,
          fontFamily: "Poppins_500Medium_Italic",
        }}
      >
        Choose Section / Category:
      </Text>
    <Animated.View
      entering={FadeInDown}
      style={[styles.container, { borderColor: isDark.border, backgroundColor: isDark.backgroundSecondary }]}
    >
      <RNPickerSelect
        onValueChange={(value: any) => setData({ ...data, section: value })}
        items={select.section}
        value={data.section}
        placeholder={{ label: "Choose Section", value: null }}
        style={{
          inputAndroid: {
            color: isDark.text,
          },
          inputIOS: {
            color: isDark.text,
          }
        }}
      />
      {data.section === "Bikes" && (
        <RNPickerSelect
          onValueChange={(value: any) => setData({ ...data, category: value })}
          items={select.categoryBikes}
          value={data.category}
          placeholder={{ label: "Choose Category", value: null }}
          style={{
            inputAndroid: {
              color: isDark.text,
            },
            inputIOS: {
              color: isDark.text,
            }
          }}
          />
      )}
    </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: "center",
  }
});
