import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  Image,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "native-base";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { fetchProducts } from "@/redux/reducers/productSlice";
import { Link } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function Tools() {
  const colorScheme = useColorScheme();
  const isDark = Colors[colorScheme ?? "light"].background;
  const isDarkText = Colors[colorScheme ?? "light"].text;
  const itemRef = useRef(null);
  const products = useSelector((state: any) => state.products);
  const dispatch = useDispatch();
  const [numColumns, setNumColumns] = useState(2);

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

  const data = products?.data?.filter((item: any) => item.section === "Tools");

  const renderItem = ({ item }: { item: any }) => (
    <Animated.View
      entering={FadeIn}
      style={[styles.item, { width: width / numColumns - 15, borderColor: isDarkText }]}
    >
      <Skeleton
        ref={itemRef}
        isLoaded={!products.loading}
        h={width / (numColumns * 1.5)}
        w="100%"
      >
        <Image
          source={{ uri: item.image[0] }}
          style={styles.image}
          resizeMode="contain"
          resizeMethod="scale"
        />
      </Skeleton>
      <Skeleton.Text
        ref={itemRef}
        isLoaded={!products.loading}
        lines={2}
        space={1.5}
        w="90%"
        alignItems="center"
      >
        <Text
          style={[styles.title, { color: isDarkText }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.title}
        </Text>
        <Text style={[styles.text, { color: isDarkText }]}>
          {item.price} TND
        </Text>
      </Skeleton.Text>
      <TouchableOpacity activeOpacity={0.7} style={styles.button}>
        <Link
          href={{
            pathname: "/product/[data]",
            params: { data: JSON.stringify(item) },
          }}
        >
          <Text style={styles.buttonText}>view details</Text>
        </Link>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <Animated.View
      entering={FadeIn}
      style={[styles.container, { backgroundColor: isDark }]}
    >
      <Animated.FlatList
        itemLayoutAnimation={LinearTransition}
        initialNumToRender={4}
        maxToRenderPerBatch={10}
        data={data}
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
          <Text style={[styles.emptyText, { color: isDarkText }]}>
            No Accessories
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
  },
  item: {
    borderWidth: 0.5,
    borderRadius: 8,
    marginBottom: 15,
    marginHorizontal: 2,
    padding: 8,
    alignItems: "center",
    justifyContent: "space-between",
    height: height * 0.35,
  },
  image: {
    width: "100%",
    height: "50%",
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
    padding: 8,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins_500Medium",
  },
  emptyText: {
    alignSelf: "center",
    marginTop: height * 0.2,
    fontSize: 22,
    fontFamily: "Poppins_700Bold",
  },
});
