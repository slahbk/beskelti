import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StatusBar,
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
import { Avatar } from "@kolking/react-native-avatar";
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
        {
          backgroundColor: isDark.backgroundSecondary,
          borderColor: isDark.background,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.priceContainer,
          {
            backgroundColor: isDark.backgroundSecondary,
            borderColor: isDark.background,
          },
        ]}
      >
        <Text style={[styles.price, { color: isDark.text }]}>
          {item.price} TND
        </Text>
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={{flex: 1, justifyContent: "space-between" }}
      >
        <View style={{ rowGap: 10 }}>
          <Text style={[styles.title, { color: isDark.text }]}>
            {item.title}
          </Text>
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

          <Text style={[styles.description, { color: isDark.text }]}>
            Description: {item.description}
          </Text>
        </View>
        <View style={[styles.buyerContainer, {borderColor: isDark.background}]}>
          <Avatar
            name={user?.fullName}
            size={50}
            source={{ uri: user?.avatar }}
            colorize={true}
          />
          <Text style={[styles.buyer, { color: isDark.text }]}>
            {user?.fullName}
          </Text>
          <View
            style={{
              flexDirection: "row",
              columnGap: 8,
            }}
          >
            <ButtonContact user={user} contact="phone" />
            <ButtonContact user={user} contact="whatsapp" />
          </View>
        </View>
      </Animated.ScrollView>
    </Animated.View>
  );

  return (
    <Animated.ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: isDark.background },
      ]}
    >
      {visible && (
        <ImageView
          key={item.image.map((image: string, index: number) => index)}
          images={item.image.map((image: string) => ({ uri: image }))}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setVisible(false)}
          doubleTapToZoomEnabled
          animationType="slide"
        />
      )}
      <Carousel
        loop={true}
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT * 0.3}
        autoPlay={true}
        autoPlayInterval={3000}
        data={item.image}
        renderItem={renderCarouselItem}
      />
      {renderProductDetails()}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
    paddingTop: StatusBar.currentHeight,
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.3,
  },
  detailsContainer: {
    position: "relative",
    height: SCREEN_HEIGHT * 0.7,
    flex: 1,
    padding: 25,
    borderTopStartRadius: 20,
    borderTopWidth: 8,
    borderEndWidth: 8,
    borderStartWidth: 8,
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
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 8,
    marginTop: 26,
    borderColor: "white",
    borderWidth: 6,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 50,
  },
  description: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
});
