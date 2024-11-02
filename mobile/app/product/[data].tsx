import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import Animated from "react-native-reanimated";
import { useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { UserType } from "@/types/UserType";
import Carousel from "react-native-reanimated-carousel";
import ImageView from "react-native-image-viewing";
import { fetchUserDetails } from "@/services/fetchUserDetails";
import ButtonContact from "@/components/UI/ButtonContact";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ProductDetails() {
  const { data } = useLocalSearchParams();
  const item = JSON.parse(data as string);
  const colorScheme = useColorScheme();
  const isDark = Colors[colorScheme ?? "light"];
  const [user, setUser] = useState<UserType | null>(null);
  const [visible, setVisible] = useState(false);

  const fetchUser = useCallback(async () => {
    const response = fetchUserDetails({ userId: item.userId });
    setUser(await response);
  }, [item.userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const renderCarouselItem = useCallback(
    ({ item }: { item: string }) => (
      <ImageBackground
        source={{
          uri: "https://res.cloudinary.com/dzxtonbuu/image/upload/v1730537104/beskelti%20app/yaeylehhb39xdocoicas.png",
        }}
        style={styles.image}
        resizeMode="contain"
      >
        <Pressable onPress={() => setVisible(true)}>
          <Image
            source={{ uri: item }}
            style={styles.image}
            resizeMode="contain"
          />
        </Pressable>
      </ImageBackground>
    ),
    []
  );

  const renderProductDetails = () => (
    <Animated.View
      style={[
        styles.detailsContainer,
        { backgroundColor: isDark.backgroundSecondary },
      ]}
    >
      <Animated.View
        style={[
          styles.priceContainer,
          { backgroundColor: isDark.backgroundSecondary },
        ]}
      >
        <Text style={[styles.price, { color: isDark.text }]}>
          {item.price} TND
        </Text>
      </Animated.View>
      <Text style={[styles.title, { color: isDark.text }]}>{item.title}</Text>
      <Text style={[styles.sectionTitle, { color: isDark.text }]}>
        Section: {item.section}
      </Text>
      {item.category && (
        <Text style={[styles.category, { color: isDark.text }]}>
          Category: {item.category}
        </Text>
      )}
      <Text style={[styles.buyer, { color: isDark.text }]}>
        Company: {user?.company}
      </Text>
      <Text style={[styles.buyer, { color: isDark.text }]}>
        Buyer: {user?.fullName} ({user?.products.length} products)
      </Text>
      <Text style={[styles.description, { color: isDark.text }]}>
        Description: {item.description}
      </Text>
      <View style={styles.buyerContainer}>
        <ButtonContact user={user} contact="phone" />
        <ButtonContact user={user} contact="whatsapp" />
      </View>
    </Animated.View>
  );

  return (
    <Animated.ScrollView contentContainerStyle={[styles.container]}>
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
    backgroundColor: "white",
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.3,
  },
  detailsContainer: {
    position: "relative",
    flex: 1,
    padding: 25,
    borderTopStartRadius: 20,
    marginTop: -(SCREEN_HEIGHT * 0.15),
    rowGap: 10,
    borderTopWidth: 8,
    borderEndWidth: 8,
    borderStartWidth: 8,
    borderColor: "white",
  },
  priceContainer: {
    position: "absolute",
    top: -60,
    right: -8,
    width: "60%",
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderTopStartRadius: 20,
    borderTopRightRadius: 20,
    borderStartWidth: 8,
    borderTopWidth: 8,
    borderRightWidth: 8,
    borderStyle: "solid",
    borderColor: "white",
  },
  title: {
    fontSize: 26,
    fontFamily: "Poppins_700Bold_Italic",
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
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
  description: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
});
