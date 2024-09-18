import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
        headerTitleAlign: "center",
        headerStatusBarHeight: 40,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "700",
        },
        tabBarStyle: {
          position: "absolute",
          marginBottom: 10,
          borderRadius: 15,
          marginHorizontal: 10,
          shadowColor: Colors[colorScheme ?? "light"].text,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabBarIcon
              source={
                colorScheme == "dark"
                  ? require("@/assets/animation-icons/home-dark.json")
                  : require("@/assets/animation-icons/home.json")
              }
              autoPlay={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Bikes"
        options={{
          title: "Bikes",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabBarIcon
              source={
                colorScheme == "dark"
                  ? require("@/assets/animation-icons/bicycle-dark.json")
                  : require("@/assets/animation-icons/bicycle.json")
              }
              autoPlay={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Accessories"
        options={{
          title: "Accessories",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabBarIcon
              source={
                colorScheme == "dark"
                  ? require("@/assets/animation-icons/accessoires-dark.json")
                  : require("@/assets/animation-icons/accessoires.json")
              }
              autoPlay={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Tools"
        options={{
          title: "Tools",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabBarIcon
              source={
                colorScheme == "dark"
                  ? require("@/assets/animation-icons/tool-dark.json")
                  : require("@/assets/animation-icons/tool.json")
              }
              autoPlay={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
