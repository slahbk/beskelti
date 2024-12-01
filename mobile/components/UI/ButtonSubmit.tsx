import { Dimensions, Pressable, StyleSheet, Text } from "react-native";
import React from "react";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ButtonSubmit({
  productData,
  handleSubmit,
  isLoading,
}: any) {
  return (
    <Pressable
      style={[
        styles.button,
        {
          opacity:
            productData.title === "" ||
            productData.price === "" ||
            productData.section === "" ||
            (productData.section === "Bikes" && productData.category === "") ||
            productData.image?.length === 0
              ? 0.7
              : 1,
        },
      ]}
      onPress={handleSubmit}
      disabled={
        productData.title === "" ||
        productData.price === "" ||
        productData.section === "" ||
        (productData.section === "Bikes" && productData.category === "") ||
        productData.image?.length === 0 ||
        isLoading
      }
    >
      <Text style={styles.buttonText}>Submit</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "60%",
    height: SCREEN_HEIGHT * 0.06,
    backgroundColor: "#37B9F1",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: SCREEN_WIDTH * 0.04,
  },
});
