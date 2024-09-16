import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import LottieView from "lottie-react-native";
import { Animated } from "react-native";

export default function ButtonBikeSwitch({ selectedId, setSelectedId }: any) {
  const colorScheme = useColorScheme();
  const isDark = Colors[useColorScheme() ?? "light"].background;
  const isDarkText = Colors[useColorScheme() ?? "light"].text;
  const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

  return (
    <View style={styles.inputBlock}>
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 12,
          borderWidth: 2,
          borderColor: selectedId === "normal" ? "#17809e" : isDarkText,
          backgroundColor: selectedId === "normal" ? "#69c4f9" : isDark,
        }}
        onPress={() => setSelectedId("normal")}
        activeOpacity={0.8}
      >
        <AnimatedLottieView
          source={
            colorScheme == "dark"
              ? require("@/assets/animation-icons/bicycle--dark--.json")
              : require("@/assets/animation-icons/bicycle-classic.json")
          }
          autoPlay={true}
          style={{ width: 100, height: 100, marginBottom: -5 }}
        />

        <Text style={{ color: isDarkText }}>Normal</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          borderWidth: 2,
          borderColor: selectedId === "electric" ? "#17809e" : isDarkText,
          backgroundColor: selectedId === "electric" ? "#69c4f9" : isDark,
        }}
        onPress={() => setSelectedId("electric")}
        activeOpacity={0.8}
      >
        <View style={{ transform: [{ rotate: "90deg" }] }}>
          <AnimatedLottieView
            source={require("@/assets/animation-icons/bicycle-electric.json")}
            autoPlay={true}
            style={{ width: 100, height: 100, marginBottom: -5 }}
          />
        </View>
        <Text style={{ color: isDarkText }}>Electric</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 35,
    paddingBottom: StatusBar.currentHeight,
  },
  inputBlock: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
});
