import React from "react";
import { Link, Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = Colors[colorScheme ?? "light"];

  return (
      <Tabs
        screenOptions={{
          headerRight: () => (
            <Link
              href={{
                pathname: "/product/Search",
                params: { search: "search" },
              }}
              style={{ marginRight: 10 }}
            >
              <Ionicons
                name="search-sharp"
                size={25}
                color={isDark.text}
              />
            </Link>
          ),
          tabBarActiveTintColor: isDark.tint,
          headerShown: true,
          headerTitleAlign: "center",
          headerStatusBarHeight: 40,
          tabBarLabelStyle: {
            fontSize: 10,
            fontFamily: "Poppins_500Medium",
          },
          tabBarStyle: {
            shadowColor: isDark.text,
          },
          headerTitleStyle: {
            fontFamily: "Poppins_500Medium",
          },
          tabBarShowLabel: false,
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
                focused={focused}
                label="Home"
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
                focused={focused}
                label="Bikes"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Post"
          options={{
            title: "Add new",
            tabBarIcon: ({ focused }: { focused: boolean }) => (
              <TabBarIcon
                source={
                  colorScheme == "dark"
                    ? require("@/assets/animation-icons/add-dark.json")
                    : require("@/assets/animation-icons/add.json")
                }
                focused={focused}
                label="Add new"
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
                focused={focused}
                label="Accessories"
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
                focused={focused}
                label="Tools"
              />
            ),
          }}
        />
      </Tabs>
  );
}
