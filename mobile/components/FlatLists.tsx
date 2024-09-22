import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Link } from "expo-router";
import { useSelector } from "react-redux";
import { HStack, Skeleton, Center, Box } from "native-base";

export default function FlatLists({ data }: { data: any }) {
  const isDark = Colors[useColorScheme() ?? "light"].text;
  const width = Dimensions.get("screen").width;
  const itemRef = React.useRef(null);
  const loading = useSelector((state: any) => state.products.loading);

  const renderItem = ({ item }: { item: any }) => {
    return (
      <Box style={styles.item} key={item.id}>
        <Skeleton
          ref={itemRef}
          isLoaded={!loading}
          top={0}
          h={width / 3.5}
          w={width / 2.5}
          position={"absolute"}
          borderRadius={5}
        >
          <Image
            src={item.image[0]}
            alt={item.title}
            style={{
              width: width / 2.5,
              height: width / 3.5,
              position: "absolute",
              top: 0,
            }}
            resizeMode="stretch"
            borderRadius={5}
          />
        </Skeleton>
        <Skeleton.Text
          ref={itemRef}
          isLoaded={!loading}
          position={"absolute"}
          bottom={1}
          lines={1}
          lineHeight={50}
        >
          <Text
            style={{
              fontSize: 20,
              color: isDark,
              position: "absolute",
              bottom: 0,
            }}
          >
            {item.title}
          </Text>
        </Skeleton.Text>
      </Box>
    );
  };

  return (
    <View>
      <View style={styles.titleBox}>
        <Text style={{ color: isDark, fontWeight: "semibold", fontSize: 24 }}>
          {data.title}
        </Text>
        <TouchableOpacity>
          <Link href={data.title}>
            <Text
              style={{ color: isDark, fontWeight: "regular", fontSize: 16 }}
            >
              See all
            </Text>
          </Link>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data.data}
        renderItem={renderItem}
        horizontal
        ref={itemRef}
        showsHorizontalScrollIndicator={false}
        style={{ height: width / 2.5 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    lineHeight: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: "semibold",
    lineHeight: 30,
  },
  titleBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 5,
  },
  item: {
    flex: 1,
    borderWidth: 0.5,
    borderStyle: "solid",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    width: Dimensions.get("screen").width / 2.5,
  },
});
