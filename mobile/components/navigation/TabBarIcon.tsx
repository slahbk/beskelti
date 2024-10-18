import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import LottieView from "lottie-react-native";
import { Animated, StyleSheet, Text } from "react-native";

type lottie = {
  source: string;
  focused: boolean;
  label: string;
};

export function TabBarIcon({ source, focused, label, ...rest }: lottie) {
  const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

  return (
    <Animated.View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: focused
              ? Colors[useColorScheme() ?? "light"].background
              : Colors[useColorScheme() ?? "light"].background,
            borderTopLeftRadius: focused ? 100 : 0,
            borderTopRightRadius: focused ? 100 : 0,
            borderTopWidth: focused ? 2 : 0,
            borderStartWidth: focused ? 1 : 0,
            borderEndWidth: focused ? 1 : 0,
            top: focused ? -15 : 0,
            borderColor: Colors[useColorScheme() ?? "light"].tint,
          },
        ]}
      ></Animated.View>

      <AnimatedLottieView
        source={source}
        autoPlay={focused}
        style={{ width: 35, height: 35, marginBottom: -5, alignSelf: "center" }}
        loop={false}
        speed={1.2}
        {...rest}
      />
      {focused && (
        <Animated.View>
          <Text
            style={{
              fontSize: 11,
              fontFamily: "Poppins_500Medium",
              marginTop: 2,
              color: Colors[useColorScheme() ?? "light"].tint,
            }}
          >
            {label}
          </Text>
        </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: "100%",
    height: "100%",

    alignSelf: "center",
    position: "absolute",
  },
});
