import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function InputDescription({ productData, setProductData }: any) {
  const isDark = Colors[useColorScheme() ?? "light"];

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: isDark.text,
          alignSelf: "flex-start",
          left: SCREEN_WIDTH * 0.08,
          marginBottom: 5,
          fontFamily: "Poppins_500Medium_Italic",
        }}
      >
        Description:
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: isDark.border,
            color: isDark.text,
          },
        ]}
        placeholder="Description..."
        placeholderTextColor={"gray"}
        value={productData.description}
        onChangeText={(text) =>
          setProductData({ ...productData, description: text })
        }
        numberOfLines={5}
        multiline
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      width: "100%",
      alignItems: "center",
    },
  input: {
    width: "90%",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: "flex-end",
    textAlignVertical: "top",
    height: "auto"
  },
});
