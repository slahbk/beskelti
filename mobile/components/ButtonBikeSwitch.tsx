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
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 12,
          borderWidth: 1,
          height: 60,
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
          style={{ width: 40, height: 40, marginBottom: -7 }}
        />

        <Text style={{ color: isDarkText, fontFamily: "Poppins_500Medium" }}>Normal</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 12,
          borderWidth: 1,
          height: 60,
          borderColor: selectedId === "all" ? "#17809e" : isDarkText,
          backgroundColor: selectedId === "all" ? "#69c4f9" : isDark,
        }}
        onPress={() => setSelectedId("all")}
        activeOpacity={0.8}
      >
        <Text style={{ color: isDarkText, fontFamily: "Poppins_500Medium" }}>All</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          borderWidth: 1,
          height: 60,
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
            style={{ width: 40, height: 40, marginBottom: -7 }}
          />
        </View>
        <Text style={{ color: isDarkText, fontFamily: "Poppins_500Medium" }}>Electric</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: StatusBar.currentHeight,
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
});
