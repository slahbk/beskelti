import React, { useCallback } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Link } from "expo-router";
import { useSelector } from "react-redux";
import { Skeleton } from "native-base";
import Animated, {
  FadeInRight,
  LinearTransition,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ListProducts({ data }: { data: any }) {
  const colorScheme = useColorScheme();
  const isDark = Colors[colorScheme ?? "light"];
  const loading = useSelector((state: any) => state.products.loading);

  const array = ["Tools", "Accessories", "Bikes"].map((_, index) => {
    return {
      id: index ,
      title: data.title,
      image: [
        "@/assets/images/placeholder.png",
      ]
    }
  });

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      const itemWidth = SCREEN_WIDTH * 0.4;
      const itemHeight = itemWidth * 1.2;

      return (
        <Animated.View
          entering={FadeInRight.delay(index * 100)}
          style={[
            styles.item,
            {
              width: itemWidth,
              height: itemHeight,
              backgroundColor: isDark.background,
              borderColor: isDark.text,
              shadowColor: isDark.shadow
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

          <Skeleton isLoaded={!loading} h="70%" w="100%" borderRadius={10}>
            <Image
              source={{ uri: item.image[0] }}
              style={[styles.image, { height: itemHeight * 0.6 }]}
              resizeMode="contain"
              defaultSource={require("@/assets/images/placeholder.png")}
              // loadingIndicatorSource={{uri: "@/assets/images/placeholder.png"}}
            />
          </Skeleton>
          <Skeleton.Text isLoaded={!loading} lines={1} w="90%" mt={2}>
            <Text
              style={[styles.itemTitle, { color: isDark.text }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>
          </Skeleton.Text>
        </Animated.View>
      );
    },
    [loading]
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
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
      </View>
      <Animated.FlatList
        data={data.data || array}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        keyExtractor={(item) => item.id.toString()}
        itemLayoutAnimation={LinearTransition}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  titleBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 6,
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
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
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
