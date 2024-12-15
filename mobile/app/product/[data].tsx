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
import Carousel from "react-native-reanimated-carousel";
import ImageView from "react-native-image-viewing";
import ButtonContact from "@/components/UI/ButtonContact";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/redux/reducers/userSlice";
import Skeleton from "react-native-reanimated-skeleton";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ProductDetails() {
  const dispatch = useDispatch();
  const { data } = useLocalSearchParams();
  const item = JSON.parse(data as string);
  const colorScheme = useColorScheme();
  const isDark = Colors[colorScheme ?? "light"];
  const [visible, setVisible] = useState(false);
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    dispatch(fetchUser({ userId: item.userId }) as any);
  }, [dispatch]);

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
        contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}
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
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Text style={[styles.buyer, { color: isDark.text }]}>Company:</Text>
            <Skeleton
              containerStyle={{ flex: 1 }}
              animationDirection="horizontalLeft"
              isLoading={user.loading}
              layout={[
                {
                  borderRadius: 10,
                  height: 12,
                  width: SCREEN_WIDTH * 0.3,
                },
              ]}
            >
              <Text style={[styles.buyer, { color: isDark.text }]}>
                {user?.data?.company}
              </Text>
            </Skeleton>
          </View>
          <Text style={[styles.description, { color: isDark.text }]}>
            Description: {item.description}
          </Text>
        </View>
        <View
          style={[
            styles.buyerContainer,
            { backgroundColor: isDark.background, shadowColor: isDark.shadow },
          ]}
        >
          {user?.data?.avatar !== "" && user?.data?.avatar !== "null" ? (
            <Image
              source={{ uri: user?.data?.avatar }}
              style={{ width: 50, height: 50, borderRadius: 50 }}
              resizeMode="cover"
            />
          ) : (
            <Text style={[styles.avatar]}>
              {(
                user?.data?.fullName?.split(" ")[0][0] +
                user?.data?.fullName?.split(" ")[1][0]
              ).toUpperCase()}
            </Text>
          )}

          <Skeleton
            containerStyle={{ backgroundColor: "transparent" }}
            animationDirection="horizontalLeft"
            isLoading={user.loading}
            layout={[
              {
                borderRadius: 10,
                height: 12,
                width: SCREEN_WIDTH * 0.35,
              },
            ]}
          >
            <Text style={[styles.buyer, { color: isDark.text }]}>
              {user?.data?.fullName}
            </Text>
          </Skeleton>
          <View
            style={{
              flexDirection: "row",
              columnGap: 8,
            }}
          >
            <ButtonContact user={user.data} contact="phone" />
            <ButtonContact user={user.data} contact="whatsapp" />
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
        loop={item.image.length > 1 ? true : false}
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
    gap: 10,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 10,
    shadowRadius: 10,
    elevation: 2,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 50,
    marginBottom: 4,
  },
  avatar: {
    fontSize: 26,
    backgroundColor: "#b5b5b5",
    color: "#fff",
    width: 50,
    height: 50,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 100,
    fontFamily: "Poppins_500Medium",
  },
  description: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
});
