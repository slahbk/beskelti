import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { ProductType } from "@/types/ProductType";
import Animated from "react-native-reanimated";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function InputTitle({
  productData,
  setProductData,
  isDark,
}: {
  productData: ProductType;
  setProductData: any;
  isDark: any;
}) {
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
        Title:
      </Text>
      <Animated.View
        style={{
          position: "relative",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextInput
          style={[
            styles.input,
            {
              borderColor: isDark.border,
              color: isDark.text,
              paddingHorizontal: SCREEN_WIDTH * 0.12,
              backgroundColor: isDark.backgroundSecondary,
            },
          ]}
          value={productData.title}
          placeholder="Title..."
          placeholderTextColor={"gray"}
          onChangeText={(text) =>
            setProductData({ ...productData, title: text })
          }
        />
        <Ionicons
          name={
            productData.section === "Bikes"
              ? "bicycle-outline"
              : productData.section === "Accessories"
              ? "star-outline"
              : "build-outline"
          }
          style={{ position: "absolute", left: SCREEN_WIDTH * 0.08 }}
          size={25}
          color="gray"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "90%",
    height: SCREEN_HEIGHT * 0.06,
    borderWidth: 1,
    borderRadius: 5,
    position: "relative",
  },
});
