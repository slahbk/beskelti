import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import React, { useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useSelector } from "react-redux";
import { ProductType } from "@/types/ProductType";
import ProductSearch from "@/components/UI/ProductSearch";
import Animated from "react-native-reanimated";
import ButtonFilterSearch from "@/components/UI/ButtonFilterSearch";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Search() {
  const colorScheme = useColorScheme();
  const isDark = Colors[colorScheme ?? "light"];
  const [dataSearch, setDataSearch] = React.useState([]);
  const [filterBy, setFilterBy] = React.useState("all");
  const [text, setText] = React.useState("");

  const product = useSelector((state: any) => state.products.data);

  const handleSearch = () => {
    if (text && filterBy === "all") {
      const newData = product?.filter((item: ProductType) => {
        const itemData = `${item.title.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setDataSearch(newData);
    } else if (text && filterBy !== "all") {
      const newData = product?.filter((item: ProductType) => {
        const itemData = `${item.title.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1 && item.section === filterBy;
      });
      setDataSearch(newData);
    } else {
      setDataSearch([]);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [filterBy, text]);

  const renderItem = ({ item }: { item: ProductType }) => (
    <ProductSearch item={item} />
  );

  return (
    <Animated.View
      style={[
        styles.container,
        { flex: 1, backgroundColor: isDark.background },
      ]}
    >
      <TextInput
        style={[
          styles.input,
          {
            borderColor: isDark.border,
            backgroundColor: isDark.backgroundSecondary,
            color: isDark.text,
          },
        ]}
        placeholder="Search..."
        placeholderTextColor={isDark.text}
        onChangeText={(text) => setText(text)}
      />
      <Animated.View
        style={[
          {
            width: "90%",
            flexDirection: "row",
            gap: 10,
            alignSelf: "center",
            marginTop: 10,
          },
        ]}
      >
        <Text
          style={[
            {
              color: isDark.text,
              alignSelf: "center",
              fontSize: 12,
              fontFamily: "Poppins_600SemiBold",
            },
          ]}
        >
          Filter by:
        </Text>
        <FlatList
          horizontal
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ alignItems: "center", gap: 15 }}
          data={["Bikes", "Tools", "Accessories"]}
          renderItem={({ item }) => (
            <ButtonFilterSearch
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              label={item}
            />
          )}
          contentInsetAdjustmentBehavior="automatic"
        />
      </Animated.View>
      {dataSearch?.length > 0 && (
        <Text style={[styles.total, { color: isDark.text }]}>
          {dataSearch?.length} results found
        </Text>
      )}
      <FlatList
        contentContainerStyle={styles.flatListContent}
        data={dataSearch}
        renderItem={renderItem}
        numColumns={2}
        ListEmptyComponent={() => (
          <Text style={[styles.emptyText, { color: isDark.text }]}>
            Nothing found.
          </Text>
        )}
        contentInsetAdjustmentBehavior="automatic"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  flatListContent: {
    padding: 10,
    alignItems: "center",
    zIndex: 1000,
    height: "100%",
  },
  input: {
    width: "90%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 10,
  },

  total: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    alignSelf: "center",
  },
  emptyText: {
    alignSelf: "center",
    marginTop: SCREEN_HEIGHT * 0.2,
    fontSize: 22,
    fontFamily: "Poppins_700Bold",
  },
});
