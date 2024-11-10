import React, { useCallback } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Link } from "expo-router";
import { useSelector } from "react-redux";
import Skeleton from "react-native-reanimated-skeleton";
import Animated, {
  FadeInRight,
  LinearTransition,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ListProducts({ data }: { data: any }) {
  const colorScheme = useColorScheme();
  const isDark = Colors[colorScheme ?? "light"];
  const loading = useSelector((state: any) => state.products.loading);

  const array = Array.from({ length: 3 }).map((_, index) => {
    return {
      id: index,
      title: data.title,
      image: [],
    };
  });

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      const itemWidth = SCREEN_WIDTH * 0.4;
      const itemHeight = itemWidth * 1.2;

      return (
        <Animated.View
          entering={FadeInRight}
          style={[
            styles.item,
            {
              width: itemWidth,
              height: itemHeight,
              shadowColor: isDark.shadow,
              backgroundColor: isDark.backgroundSecondary,
            },
          ]}
        >
          <Link
            style={styles.link}
            href={{
              pathname: "/product/[data]",
              params: { data: JSON.stringify(item) },
            }}
          ></Link>
          <Skeleton
            animationDirection="horizontalLeft"
            isLoading={loading}
            layout={[
              {
                borderRadius: 10,
                height: itemHeight * 0.7,
                marginBottom: 16,
                width: itemWidth * 0.9,
              },
              {
                alignItems: "center",
                justifyContent: "center",
                children: [
                  {
                    borderRadius: 10,
                    height: 20,
                    width: itemWidth * 0.9,
                  },
                ],
              },
            ]}
          >
            <ImageBackground
              source={{
                uri: "https://res.cloudinary.com/dzxtonbuu/image/upload/v1730537104/beskelti%20app/yaeylehhb39xdocoicas.png",
              }}
              style={[
                styles.image,
                { height: itemHeight * 0.8, width: itemWidth * 0.95 },
              ]}
              resizeMode="center"
            >
              <Image
                source={{ uri: item.image[0] }}
                style={[
                  styles.image,
                  { height: itemHeight * 0.8, width: itemWidth * 0.95 },
                ]}
                resizeMode="contain"
              />
            </ImageBackground>
            <Text
              style={[styles.itemTitle, { color: isDark.text }]}
              numberOfLines={2}
            >
              {item.title}
            </Text>
          </Skeleton>
        </Animated.View>
      );
    },
    [loading]
  );

  return (
    <Animated.View>
      <Animated.View style={styles.titleBox}>
        <Text style={[styles.sectionTitle, { color: isDark.text }]}>
          {data.title}
        </Text>
        <TouchableOpacity>
          <Link href={data.title}>
            <Text style={[styles.seeAllText, { color: isDark.text }]}>
              See all
            </Text>
          </Link>
        </TouchableOpacity>
      </Animated.View>
      <Animated.FlatList
        alwaysBounceHorizontal  
        data={data.data || array}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        keyExtractor={(item) => item.id.toString()}
        itemLayoutAnimation={LinearTransition}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 0,

  },
  titleBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
  },
  sectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
  },
  seeAllText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
  },
  flatListContent: {
    paddingVertical: 10,
  },
  item: {
    borderRadius: 10,
    marginHorizontal: 5,
    padding: 6,
    justifyContent: "space-around",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 10,
    shadowRadius: 10,
    elevation: 4,
  },
  image: {
    borderRadius: 10,
  },
  itemTitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    alignSelf: "center",
    marginTop: 2,
    textAlign: "center",
  },
  link: {
    backgroundColor: "transparent",
    position: "absolute",
    zIndex: 100,
    width: "100%",
    height: "100%",
  },
});
