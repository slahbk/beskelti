import {
  StyleSheet,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Text,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import ListBikes from "@/components/ListBikes";
import ListAccessories from "@/components/ListAccessories";
import ListTools from "@/components/ListTools";
import { useEffect, useState } from "react";
import { useFetchProduct } from "@/hooks/useFetchProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/toolkit/reducers/productSlice";

export default function HomeScreen() {
  const isDark = Colors[useColorScheme() ?? "light"].background;
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products);

  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: isDark,
      }}
      contentContainerStyle={styles.container}
    >
      <ListBikes />
      <ListAccessories />
      <ListTools />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 35,
    paddingBottom: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
