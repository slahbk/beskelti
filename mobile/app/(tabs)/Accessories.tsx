import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderTab from '@/components/HeaderTab'
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function Accessories() {
  const colorScheme = useColorScheme();
  const isDark = Colors[useColorScheme() ?? "light"].background;
  const isDarkText = Colors[useColorScheme() ?? "light"].text;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{ backgroundColor: isDark }}
    >
      <Text style={{ color: isDarkText }}>accessories</Text>
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