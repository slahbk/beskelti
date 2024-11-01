import {
  Alert,
  Linking,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function ButtonContact({ user, contact }: any) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: contact === "phone" ? "#005e97" : "#2dcb49" },
      ]}
      activeOpacity={0.6}
      onPress={() =>
        Alert.alert(
          `${contact === "phone" ? "Call" : "Whatsapp"} ${user?.fullName}`,
          `Phone: ${user?.phone}`,
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: contact === "phone" ? "Call" : "Chat",
              onPress: () =>
                contact === "phone"
                  ? Linking.openURL(`tel:${user?.phone}`)
                  : Linking.openURL(`whatsapp://send?phone=${user?.phone}`),
            },
          ]
        )
      }
    >
      <Ionicons
        name={contact === "phone" ? "call" : "logo-whatsapp"}
        size={26}
        color="white"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "45%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
});
