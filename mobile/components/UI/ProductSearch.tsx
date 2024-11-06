import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import Animated, { FadeIn } from "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ProductSearch({ item }: any) {
  const itemHeight = SCREEN_HEIGHT * 0.3;
  const [numColumns, setNumColumns] = React.useState(2);
  const itemWidth = SCREEN_WIDTH / numColumns - 15;
  const colorScheme = useColorScheme();
  const isDark = Colors[colorScheme ?? "light"];

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
        <View style={{ alignItems: "center" }}>
          <Text style={[styles.text, { color: isDark.text }]}>
            {item.price} TND
          </Text>

          {item.category && (
            <Text style={[styles.text, { color: isDark.text }]}>
              {item.category} bike
            </Text>
          )}
          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.button, { width: itemWidth * 0.95 }]}
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
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
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
});
