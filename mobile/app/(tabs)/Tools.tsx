import { StyleSheet, ScrollView, Text } from "react-native";
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function Tools() {
  const colorScheme = useColorScheme();
  const isDark = Colors[useColorScheme() ?? "light"].background;
  const isDarkText = Colors[useColorScheme() ?? "light"].text;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{ backgroundColor: isDark }}
    >
      <Text style={{ color: isDarkText }}>tools</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});