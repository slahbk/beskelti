import { useColorScheme } from "@/hooks/useColorScheme";
import LottieView from "lottie-react-native";
import { Animated, Easing } from "react-native";

type lottie = {
  source: any;
  autoPlay: boolean;
};

export function TabBarIcon({ source, autoPlay, ...rest }: lottie) {
  const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

  return (
    <AnimatedLottieView
      source={source}
      autoPlay={autoPlay}
      style={{ width: 35, height: 35, marginBottom: -5 }}
      loop={false}
      speed={1.2}
      {...rest}
    />
  );
}
