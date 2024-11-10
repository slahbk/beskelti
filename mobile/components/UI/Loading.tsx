import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";
import * as Progress from "react-native-progress";
import { Ionicons } from "@expo/vector-icons";

export default function Loading({
  progress,
  setIsLoading,
  handleExit,
}: {
  progress: number;
  setIsLoading: any;
  handleExit: any;
}) {
  const [exit, setIsExit] = React.useState(false);

  setTimeout(() => {
    setIsExit(true);
  }, 30000);

  useEffect(() => {
    () => {
      setIsExit(false);
    };
  }, []);

  const handleCancel = () => {
    setIsExit(false);
    setIsLoading(false);
    handleExit();
  };

  return (
    <View style={styles.container}>
      {exit && (
        <View style={styles.exitContainer}>
          <Text style={styles.text2}>Slow connection !!</Text>
        <Ionicons
          name="close"
          size={32}
          color="white"
          onPress={handleCancel}
        />
        </View>
      )}
      <LottieView
        source={require("../../assets/animation-icons/loading.json")}
        style={styles.animation}
        autoPlay
      />
      <View style={styles.progressContainer}>
        <Text style={styles.text}>{Math.round((progress / 10) * 100)}%</Text>
        <Progress.Bar
          animationType="spring"
          height={10}
          progress={progress / 10}
          width={200}
          borderColor="white"
        />
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
    top: -50,
  },
  text: {
    fontFamily: "Poppins_600SemiBold_Italic",
    fontSize: 20,
    letterSpacing: 5,
    color: "white",
    top: 0,
  },
  text2: {
    fontFamily: "Poppins_600SemiBold_Italic",
    fontSize: 13,
    letterSpacing: 3,
    color: "white",
  },
  exitContainer: {
    display: "flex",
    position: "absolute",
    top: 25,
    right: 25,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  }
});
