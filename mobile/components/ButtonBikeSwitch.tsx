import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import LottieView from "lottie-react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";

const { width } = Dimensions.get('window');

export default function ButtonBikeSwitch({ selectedId, setSelectedId, scrollY }: any) {
  const colorScheme = useColorScheme();
  const isDark = Colors[colorScheme ?? "light"].background;
  const isDarkText = Colors[colorScheme ?? "light"].text;
  const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

  const buttonWidth = width * 0.3; // 30% of screen width
  const buttonHeight = width * 0.15; // 15% of screen width

  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 100],
      [0, -100],
      Extrapolation.CLAMP
    );

    return {
      opacity: opacity.value,
      transform: [{ translateY }],
    };
  });

  const renderButton = (id: string, label: string, icon?: React.ReactNode) => (
    <TouchableOpacity
      style={[
        styles.button,
        {
          width: buttonWidth,
          height: buttonHeight,
          borderColor: selectedId === id ? "#17809e" : isDarkText,
          backgroundColor: selectedId === id ? "#69c4f9" : isDark,
        },
      ]}
      onPress={() => setSelectedId(id)}
      activeOpacity={0.8}
    >
      {icon}
      <Text style={[styles.buttonText, { color: isDarkText }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {renderButton(
        "normal",
        "Normal",
        <AnimatedLottieView
          source={
            colorScheme === "dark"
              ? require("@/assets/animation-icons/bicycle--dark--.json")
              : require("@/assets/animation-icons/bicycle-classic.json")
          }
          autoPlay={true}
          style={styles.lottie}
        />
      )}
      {renderButton("all", "All")}
      {renderButton(
        "electric",
        "Electric",
        <View style={styles.rotatedView}>
          <AnimatedLottieView
            source={require("@/assets/animation-icons/bicycle-electric.json")}
            autoPlay={true}
            style={styles.lottie}
          />
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.02,
    paddingVertical: width * 0.02,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
  },
  buttonText: {
    fontFamily: "Poppins_500Medium",
    fontSize: width * 0.03,
  },
  lottie: {
    width: width * 0.1,
    height: width * 0.1,
    marginBottom: -width * 0.02,
  },
  rotatedView: {
    transform: [{ rotate: "90deg" }],
  },
});
