import { StyleSheet, Text } from "react-native";
import React from "react";
import InputSpinner from "react-native-input-spinner";

export default function InputPriceButton({ data, setData }: any) {
  return (
    <InputSpinner
      editable={true}
      value={data.price}
      skin="clean"
      width={"60%"}
      maxLength={4}
      placeholder="0"
      style={{ marginVertical: 5, columnGap: 4 }}
      prepend={<Text style={styles.text}>Price =</Text>}
      append={<Text style={styles.text}>TND</Text>}
      onChange={(value: string) =>
        setData({ ...data, price: value.toString() })
      }
    />
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#808080",
    fontWeight: "semibold",
    fontSize: 15,
  },
});
