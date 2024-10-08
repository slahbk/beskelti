import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import axios from "axios";
import { API_BASE_URL } from "@/constants/ApiConfig";
import { UserType } from "@/types/UserType";

export default function ProductDetails() {
  const { data } = useLocalSearchParams();
  const item = JSON.parse(data as string);
  const colorScheme = useColorScheme();
  const isDarkText = Colors[colorScheme ?? "light"].text;
  const isDarkBackground = Colors[colorScheme ?? "light"].background;
  const [user, setUser] = useState<UserType | null>(null);

  const getUser = async () => {
    try {
      const response = await axios(`${API_BASE_URL}/user/${item.userId}`);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: isDarkBackground },
      ]}
    >
      <Image
        source={{ uri: item.image[0] }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.detailsContainer}>
        <Text style={[styles.title, { color: isDarkText }]}>{item.title}</Text>
        <Text style={[styles.price, { color: isDarkText }]}>
          {item.price} TND
        </Text>
        <Text style={[styles.sectionTitle, { color: isDarkText }]}>
          Section: {item.section}
        </Text>
        <Text style={[styles.category, { color: isDarkText }]}>
          Category: {item.category}
        </Text>
        <Text style={[styles.buyer, { color: isDarkText }]}>
          Company: {user?.company}
        </Text>
        <Text style={[styles.buyer, { color: isDarkText }]}>
          Buyer: {user?.fullName}
        </Text>
        <Text style={[styles.buyer, { color: isDarkText }]}>
          Number of products: {user?.products.length}
        </Text>
      </View>
      <Text style={[styles.description, { color: isDarkText }]}>
        Description: {item.description}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 16,
  },
  detailsContainer: {
    // flex: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold_Italic",
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    marginBottom: 8,
  },
  buyer: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    lineHeight: 24,
  },
});
