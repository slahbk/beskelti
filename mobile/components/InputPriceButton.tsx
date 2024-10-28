import { StyleSheet, Text } from "react-native";
import React from "react";
import InputSpinner from "react-native-input-spinner";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export default function InputPriceButton({ data, setData }: any) {
  const isDark = Colors[useColorScheme() ?? "light"];

  return (
    <InputSpinner
      editable={true}
      value={data.price}
      onChange={(value: string) => setData({ ...data, price: value.toString() })}
      skin="paper"
      width={"60%"}
      maxLength={4}
      placeholder="0"
      prepend={
        <Text
          style={{
            color: "#808080",
            fontWeight: "semibold",
            fontSize: 14,
            paddingLeft: 10,
          }}
        >
          Price =
        </Text>
      }
      append={
        <Text
          style={{
            color: "#808080",
            fontWeight: "semibold",
            fontSize: 14,
            paddingRight: 10,
          }}
        >
          DT
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({});
