import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useSelector } from "react-redux";
import { ProductType } from "@/types/ProductType";
import ProductSearch from "@/components/UI/ProductSearch";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Search() {
  const colorScheme = useColorScheme();
  const isDark = Colors[colorScheme ?? "light"];
  const [filteredData, setFilteredData] = React.useState([]);
  const product = useSelector((state: any) => state.products.data);

  const handleSearch = (text: string) => {
    if (text) {
      const newData = product.filter((item: ProductType) => {
        const itemData = `${item.title.toUpperCase()} 
                          ${item.section.toUpperCase()} 
                          ${item.category.toUpperCase()} `;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData([]);
    }
  };

  const renderItem = ({ item }: { item: ProductType }) => (
    <ProductSearch item={item} />
  );

  return (
    <View
      style={[
        styles.container,
        { flex: 1, backgroundColor: isDark.backgroundSecondary },
      ]}
    >
      <TextInput
        style={[
          styles.input,
          {
            borderColor: isDark.border,
            backgroundColor: isDark.background,
            color: isDark.text,
          },
        ]}
        placeholder="Search..."
        placeholderTextColor={isDark.text}
        onChangeText={(text) => handleSearch(text)}
      />
      {filteredData.length > 0 && (
        <Text style={[styles.total, { color: isDark.text }]}>
          {filteredData.length} results found
        </Text>
      )}
      <FlatList
        contentContainerStyle={styles.flatListContent}
        data={filteredData}
        renderItem={renderItem}
        numColumns={2}
        ListEmptyComponent={() => (
          <Text style={[styles.emptyText, { color: isDark.text }]}>
            Nothing found.
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  flatListContent: {
    padding: 10,
    alignItems: "center",
  },
  input: {
    width: "90%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    alignSelf: "center",
    alignItems: "center",
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
