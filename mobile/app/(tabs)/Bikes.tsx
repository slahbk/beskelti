import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  Dimensions,
  Image,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import ButtonBikeSwitch from "@/components/ButtonBikeSwitch";
import { useDispatch, useSelector } from "react-redux";
import { HStack, Skeleton, Center, Box } from "native-base";
import { fetchProducts } from "@/toolkit/reducers/productSlice";

export default function Bikes() {
  const colorScheme = useColorScheme();
  const isDark = Colors[useColorScheme() ?? "light"].background;
  const isDarkText = Colors[useColorScheme() ?? "light"].text;
  const [selectedId, setSelectedId] = useState<string | undefined>("all");
  const width = Dimensions.get("screen").width;
  const itemRef = React.useRef(null);
  const products = useSelector((state: any) => state.products);
  const dispatch = useDispatch();

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <Skeleton
        ref={itemRef}
        isLoaded={!products.loading}
        top={0}
        h={width / 2.5}
        w={width}
      >
        <Image
          src={item.image[0]}
          alt={item.title}
          style={{ width: "100%", height: width / 2.5 }}
          resizeMode="contain"
        />
      </Skeleton>
      <Skeleton.Text
        ref={itemRef}
        isLoaded={!products.loading}
        flex={1}
        alignContent={"center"}
        lines={3}
        space={1.5}
      >
        <Text
          style={{
            fontSize: 20,
            color: isDarkText,
            fontWeight: "bold",
            marginBottom: 5,
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: isDarkText,
          }}
        >
          {item.price} DT
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: isDarkText,
          }}
        >
          description : {item.description}
        </Text>
      </Skeleton.Text>
    </View>
  );

  return (
    <SafeAreaView
      // showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: isDark,
        paddingBottom: StatusBar.currentHeight,
        height: "100%",
        flex: 1,
        flexDirection: "column",
      }}
      // contentContainerStyle={styles.container}
    >
      <ButtonBikeSwitch selectedId={selectedId} setSelectedId={setSelectedId} />
      <FlatList
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        data={products.data.filter((item: any) => item.category === selectedId)}
        ref={itemRef}
        renderItem={renderItem}
        role="list"
        numColumns={2}
        style={{ marginTop: 90, marginBottom: StatusBar.currentHeight }}
        keyExtractor={(item: any) => item.id}
        columnWrapperStyle={{ gap: 10 }}
        refreshControl={
          <RefreshControl
            refreshing={products.loading}
            onRefresh={() => dispatch(fetchProducts() as any)}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 35,
    paddingBottom: StatusBar.currentHeight,
  },
  inputBlock: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  item: {
    zIndex: 10,
    flex: 1,
    borderWidth: 0.5,
    marginBottom: 20,
    gap: 3,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("screen").width,
    height: "auto",
  },
  text: {
    fontSize: 14,
    lineHeight: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: "semibold",
    lineHeight: 30,
  },
});
