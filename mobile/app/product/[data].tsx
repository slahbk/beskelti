import {
  Alert,
  Dimensions,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState, useCallback, useRef } from "react";
import Animated from "react-native-reanimated";
import { Link, useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import axios from "axios";
import { UserType } from "@/types/UserType";
import Carousel from "react-native-reanimated-carousel";
import ImageView from "react-native-image-viewing";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ProductDetails() {
  const { data } = useLocalSearchParams();
  const item = JSON.parse(data as string);
  const colorScheme = useColorScheme();
  const isDarkText = Colors[colorScheme ?? "light"].text;
  const isDarkBackground = Colors[colorScheme ?? "light"].background;
  const [user, setUser] = useState<UserType | null>(null);
  const [visible, setVisible] = useState(false);
  const fetchUser = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/user/${item.userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [item.userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const renderCarouselItem = useCallback(
    ({ item }: { item: string }) => (
      <Pressable onPress={() => setVisible(true)}>
        <Image
          source={{ uri: item }}
          style={styles.image}
          resizeMode="contain"
        />
      </Pressable>
    ),
    []
  );

  const renderProductDetails = () => (
    <View
      style={[styles.detailsContainer, { backgroundColor: isDarkBackground }]}
    >
      <Text style={[styles.title, { color: isDarkText }]}>{item.title}</Text>
      <Text style={[styles.price, { color: isDarkText }]}>
        {item.price} TND
      </Text>
      <Text style={[styles.sectionTitle, { color: isDarkText }]}>
        Section: {item.section}
      </Text>
      {item.category && (
        <Text style={[styles.category, { color: isDarkText }]}>
          Category: {item.category}
        </Text>
      )}
      <Text style={[styles.buyer, { color: isDarkText }]}>
        Company: {user?.company}
      </Text>
      <Text style={[styles.buyer, { color: isDarkText }]}>
        Buyer: {user?.fullName} ({user?.products.length} products)
      </Text>
      <Text style={[styles.description, { color: isDarkText }]}>
        Description: {item.description}
      </Text>
      <View style={styles.buyerContainer}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.button, { backgroundColor: "#1ed760" }]}
          onPress={() =>
            Alert.alert(`call ${user?.fullName}`, `Phone: ${user?.phone}`, [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Call",
                onPress: () => Linking.openURL(`tel:${user?.phone}`),
              },
            ])
          }
        >
          <Text style={styles.buyer}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#26b1f3" }]}
        >
          <Text style={styles.buyer}>Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Animated.ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: isDarkBackground },
      ]}
    >
      {visible && (
        <ImageView
          key={item.image.map((image: string, index: number) => index)}
          images={item.image.map((image: string) => ({ uri: image }))}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setVisible(false)}
        />
      )}
      <Carousel
        loop={false}
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT * 0.3}
        autoPlay={false}
        data={item.image}
        renderItem={renderCarouselItem}
      />
      {renderProductDetails()}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.3,
  },
  detailsContainer: {
    flex: 1,
    padding: 30,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    marginTop: -100,
    rowGap: 12,
    borderWidth: 2,
    borderColor: "gray",
  },
  title: {
    fontSize: 26,
    fontFamily: "Poppins_700Bold_Italic",
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
  },
  category: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  buyer: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  buyerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: "45%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  description: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
});
