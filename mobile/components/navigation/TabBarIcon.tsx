import { useColorScheme } from "@/hooks/useColorScheme";
import LottieView from "lottie-react-native";
import { Animated, Easing } from "react-native";

type lottie = {
  source: any;
  focused: boolean;
};

export function TabBarIcon({ source, focused, ...rest }: lottie) {
  const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

  return (
    <AnimatedLottieView
      source={source}
      autoPlay={focused}
      style={{ width: 35, height: 35, marginBottom: -5 }}
      loop={false}
      speed={1.2}
      {...rest}
    />
  );
}
