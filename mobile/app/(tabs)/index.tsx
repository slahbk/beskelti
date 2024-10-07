import {
  StyleSheet,
  Platform,
  ScrollView,
  StatusBar,
  RefreshControl,
  Dimensions,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import ListBikes from "@/components/ListBikes";
import ListAccessories from "@/components/ListAccessories";
import ListTools from "@/components/ListTools";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/redux/reducers/productSlice";
import Animated from "react-native-reanimated";

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const isDark = Colors[useColorScheme() ?? "light"].background;
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: any) => state.products);

  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchProducts() as any);
  };

  if (error) {
    // You might want to add error handling here
    console.error("Error fetching products:", error);
  }

  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: isDark,
      }}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={handleRefresh}
        />
      }
    >
      <ListBikes />
      <ListAccessories />
      <ListTools />
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: height * 0.04,
    paddingBottom: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: width * 0.02,
  },
});
