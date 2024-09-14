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

export default function FlatLists({ data }: { data: any }) {
  const isDark = Colors[useColorScheme() ?? "light"].text;
  const width = Dimensions.get("screen").width;
  const itemRef = React.useRef(null);

  const renderItem = ({ item }: { item: number }) => {
    return (
      <View style={styles.item}>
        <Image
          source={require("@/assets/images/sports-bicycle-hwk.png")}
          width={50}
          height={50}
          style={{ width: width / 3, height: width / 3 }}
          resizeMode="contain"
        />
        <Text style={{ fontSize: 20, color: isDark }}>{data.title}</Text>
      </View>
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
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    width: Dimensions.get("screen").width / 2.5,
  },
});
