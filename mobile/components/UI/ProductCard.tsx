import {
  Dimensions,
  Image,
  ImageBackground,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Skeleton from "react-native-reanimated-skeleton";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useDispatch, useSelector } from "react-redux";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";
import { Link } from "expo-router";
import { fetchProducts } from "@/redux/reducers/productSlice";
import ButtonBikeSwitch from "./ButtonBikeSwitch";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ProductCard({ section }: { section: string }) {
  const colorScheme = useColorScheme();
  const isDark = Colors[colorScheme ?? "light"];
  const itemRef = useRef(null);
  const products = useSelector((state: any) => state.products);
  const dispatch = useDispatch();
  const [numColumns, setNumColumns] = useState(2);
  const [selectedId, setSelectedId] = useState<string>("all");

  useEffect(() => {
    const updateLayout = () => {
      const { width } = Dimensions.get("window");
      setNumColumns(width > 600 ? 3 : 2);
    };

    const dimensionsHandler = Dimensions.addEventListener(
      "change",
      updateLayout
    );
    updateLayout();

    return () => {
      dimensionsHandler.remove();
    };
  }, []);

  const data = products?.data?.filter((item: any) => item.section === section);
  const filteredData =
    selectedId === "all" || section !== "Bikes"
      ? data
      : data?.filter((item: any) => item.category === selectedId);

  const emptyArray = Array.from({ length: 6 }).map((_, index) => {
    return {
      id: index,
      title: section,
      image: [],
    };
  });

  const renderItem = ({ item }: { item: any }) => {
    const itemWidth = SCREEN_WIDTH / numColumns - 15;
    const itemHeight = SCREEN_HEIGHT * 0.3;
    return (
      <Animated.View
        entering={FadeIn}
        style={[
          styles.item,
          {
            width: itemWidth,
            backgroundColor: isDark.backgroundSecondary,
            shadowColor: isDark.shadow,
          },
        ]}
      >
        <Skeleton
          animationDirection="horizontalRight"
          isLoading={products.loading}
          layout={[
            {
              borderRadius: 10,
              height: SCREEN_WIDTH / (numColumns * 1.5),
              marginBottom: 16,
              width: itemWidth * 0.9,
            },
            {
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              children: [
                {
                  borderRadius: 10,
                  height: 20,
                  width: itemWidth * 0.8,
                },
                {
                  borderRadius: 10,
                  height: 20,
                  width: itemWidth * 0.8,
                },
                {
                  borderRadius: 10,
                  height: 20,
                  width: itemWidth * 0.8,
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
              {
                borderRadius: 10,
                width: itemWidth,
                height: itemHeight * 0.55,
              },
            ]}
            resizeMode="center"
          >
            <Image
              source={{ uri: item.image[0] }}
              style={[
                {
                  borderRadius: 10,
                  width: itemWidth * 0.95,
                  height: itemHeight * 0.55,
                  alignSelf: "center",
                },
              ]}
              resizeMode="contain"
            />
          </ImageBackground>
          <Animated.View style={{ alignItems: "center" }}>
            <Text
              style={[styles.title, { color: isDark.text }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>
            {filteredData && (
              <View style={{ alignItems: "center" }}>
                <Text style={[styles.text, { color: isDark.text }]}>
                  {item.price} TND
                </Text>
                {selectedId === "all" && item.category && (
                  <Text style={[styles.text, { color: isDark.text }]}>
                    category: {item.category}
                  </Text>
                )}
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={[styles.button, { width: itemWidth * 0.95 }]}
                  disabled={filteredData === undefined}
                >
                  <Link
                    href={{
                      pathname: "/product/[data]",
                      params: { data: JSON.stringify(item) },
                    }}
                  >
                    <Text style={styles.buttonText}>view details</Text>
                  </Link>
                </TouchableOpacity>
              </View>
            )}
          </Animated.View>
        </Skeleton>
      </Animated.View>
    );
  };

  return (
    <Animated.View
      style={[styles.container, { backgroundColor: isDark.background }]}
    >
      {section === "Bikes" && (
        <ButtonBikeSwitch
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      )}
      <Animated.FlatList
        itemLayoutAnimation={FadeInUp}
        data={filteredData || emptyArray}
        ref={itemRef}
        renderItem={renderItem}
        numColumns={numColumns}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={styles.flatListContent}
        refreshControl={
          <RefreshControl
            refreshing={products.loading}
            onRefresh={() => dispatch(fetchProducts() as any)}
          />
        }
        ListEmptyComponent={() => (
          <Text style={[styles.emptyText, { color: isDark.text }]}>
            No {selectedId === "all" ? "" : selectedId} {section}
          </Text>
        )}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContent: {
    padding: 10,
    alignItems: "center",
  },
  item: {
    height: "auto",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 15,
    marginHorizontal: 4,
    padding: 6,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 10,
    shadowRadius: 10,
    elevation: 4,
  },
  text: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  title: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold_Italic",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#0086d1",
    padding: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins_500Medium",
  },
  emptyText: {
    alignSelf: "center",
    marginTop: SCREEN_HEIGHT * 0.2,
    fontSize: 22,
    fontFamily: "Poppins_700Bold",
  },
});
