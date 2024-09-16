import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import ButtonBikeSwitch from "@/components/ButtonBikeSwitch";

export default function Bikes() {
  const colorScheme = useColorScheme();
  const isDark = Colors[useColorScheme() ?? "light"].background;
  const [selectedId, setSelectedId] = useState<string | undefined>("all");

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: isDark,
      }}
      contentContainerStyle={styles.container}
    >
      <ButtonBikeSwitch selectedId={selectedId} setSelectedId={setSelectedId} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 35,
    paddingBottom: StatusBar.currentHeight,
  },
  inputBlock: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
});
