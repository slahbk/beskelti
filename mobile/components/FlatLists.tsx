import React, { useCallback } from "react";
import {
  Dimensions,
  Image,
  Pressable,
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

export default function FlatLists({ data }: { data: any }) {
  const colorScheme = useColorScheme();
  const isDarkText = Colors[colorScheme ?? "light"].text;
  const isDarkBackground = Colors[colorScheme ?? "light"].background;
  const itemRef = React.useRef(null);
  const loading = useSelector((state: any) => state.products.loading);

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
              backgroundColor: isDarkBackground,
              borderColor: isDarkText,
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
            />
          </Skeleton>
          <Skeleton.Text isLoaded={!loading} lines={1} w="90%" mt={2}>
            <Text
              style={[styles.itemTitle, { color: isDarkText }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>
          </Skeleton.Text>
        </Animated.View>
      );
    },
    [loading, isDarkBackground]
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={[styles.sectionTitle, { color: isDarkText }]}>
          {data.title}
        </Text>
        <TouchableOpacity>
          <Link href={data.title}>
            <Text style={[styles.seeAllText, { color: isDarkText }]}>
              See all
            </Text>
          </Link>
        </TouchableOpacity>
      </View>
      <Animated.FlatList
        data={data.data}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        itemLayoutAnimation={LinearTransition}
        keyExtractor={(item) => item.id.toString()}
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
    marginBottom: 10,
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
    // paddingHorizontal: 10,
  },
  item: {
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 5,
    padding: 6,
    justifyContent: "space-around",
    shadowColor: "#000",
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
