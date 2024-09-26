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
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import ButtonBikeSwitch from "@/components/ButtonBikeSwitch";
import { useDispatch, useSelector } from "react-redux";
import { HStack, Skeleton, Center, Box } from "native-base";
import { fetchProducts } from "@/toolkit/reducers/productSlice";
const width = Dimensions.get("screen").width;

export default function Bikes() {
  const colorScheme = useColorScheme();
  const isDark = Colors[useColorScheme() ?? "light"].background;
  const isDarkText = Colors[useColorScheme() ?? "light"].text;
  const [selectedId, setSelectedId] = useState<string | undefined>("all");
  const itemRef = React.useRef(null);
  const products = useSelector((state: any) => state.products);
  const dispatch = useDispatch();
  const data = products.data.filter((item: any) => item.section === "Bikes");
  const filtredData = data.filter((item: any) => item.category === selectedId);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <Skeleton
        ref={itemRef}
        isLoaded={!products.loading}
        top={0}
        h={width / 2.5}
        w={width / 2}
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
        height={width - (width / 2.5 + width / 2)}
        lines={2}
        space={1.5}
        w={width / 3.5}
        alignItems={"center"}
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
            fontSize: 16,
            color: isDarkText,
          }}
        >
          {item.price} TND
        </Text>
      </Skeleton.Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#0086d1",
          padding: 5,
          borderRadius: 10,
          marginTop: "auto",
          flexGrow: 0,
        }}
      >
        <Text style={{ color: "white" }}>view details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      // showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: isDark,
        paddingBottom: StatusBar.currentHeight,
        height: "100%",
      }}
      // contentContainerStyle={styles.container}
    >
      <ButtonBikeSwitch selectedId={selectedId} setSelectedId={setSelectedId} />
      <FlatList
        initialNumToRender={4}
        maxToRenderPerBatch={10}
        // onScrollEndDrag={()=>dispatch(fetchProducts() as any)}
        data={selectedId === "all" ? data : filtredData}
        ref={itemRef}
        renderItem={renderItem}
        role="list"
        numColumns={2}
        style={{ marginTop: 50, marginBottom: StatusBar.currentHeight }}
        keyExtractor={(item: any) => item.id}
        columnWrapperStyle={{ gap: 10 }}
        refreshControl={
          <RefreshControl
            refreshing={products.loading}
            onRefresh={() => dispatch(fetchProducts() as any)}
          />
        }
        ListEmptyComponent={() => (
          <Text
            style={{ color: isDarkText, alignSelf: "center", fontSize: 20 }}
          >
            no {selectedId} bikes
          </Text>
        )}
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
  button: {},
});
