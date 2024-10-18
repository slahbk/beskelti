import React from "react";
import { StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";
import * as Progress from 'react-native-progress';

export default function Loading({progress}: {progress: number}) {
  return (
    <View  style={styles.container}>
      <LottieView
        source={require("../assets/animation-icons/loading.json")}
        style={styles.animation}
        autoPlay
      />
      <View style={styles.progressContainer}>
        <Text style={styles.text}>{Math.round(progress / 10 * 100)}%</Text>
        <Progress.Bar indeterminateAnimationDuration={500} animationType="timing" height={10} progress={progress / 10} width={200} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 250,
    height: 250,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 1000,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  progressContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    top: -50
  },
  text: {
    fontFamily: "Poppins_600SemiBold_Italic",
    fontSize: 20,
    letterSpacing: 5,
    color: "white",
    top: 0
  }
});
