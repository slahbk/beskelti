import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Pressable,
  ToastAndroid,
} from "react-native";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { Icon, Input, TextArea, VStack, Button } from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import InputPriceButton from "@/components/InputPriceButton";
import InputSectionCategory from "@/components/InputSectionCategory";
import * as ImagePicker from "expo-image-picker";
import { poroductType } from "@/types/productType";
import Animated from "react-native-reanimated";
import axios from "axios";
import { ip } from "@/constants/IpAdress";
import { Redirect } from "expo-router";

export default function Post() {
  const colorScheme = useColorScheme();
  const isDark = Colors[useColorScheme() ?? "light"].background;
  const isDarkText = Colors[useColorScheme() ?? "light"].text;
  const [data, setData] = React.useState<poroductType>({
    title: "",
    price: "",
    section: "",
    category: "",
    description: "",
    image: [],
    userId: 1,
  });

  const handleSubmit = async() => {
    console.log(data);
    try {
      await axios.post(`${ip}/product/add`, data);
      ToastAndroid.show("Product Added Successfully", ToastAndroid.BOTTOM);
      setData({
        title: "",
        price: "",
        section: "",
        category: "",
        description: "",
        image: [],
        userId: 1,
      })
    } catch (error) {
      console.error(error);
    }
  };

  const pickImage = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log("result: ", result);
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const pickImageGallery = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: true,
        base64: true,
        selectionLimit: 5,
      });

      result.assets?.map((item: any) => {
        if(data.image) {
          console.log("images1111: ", data.image);
        setData({ ...data, image: [...data.image, item.uri] });
        }
        else {
          console.log("images2222: ", data.image);
          setData({ ...data, image: [item.uri] });
        }
      });
    } catch (error) {
      console.error("error: ", error);
    }
  };

  return (
    <Animated.ScrollView
      contentContainerStyle={styles.container}
      style={{ backgroundColor: isDark }}
      showsVerticalScrollIndicator={true}
    >
      <VStack space={4} w="100%" alignItems="center">
        <Input
          w={{
            base: "85%",
            md: "25%",
          }}
          placeholder="Title"
          color={isDarkText}
          onChange={(e) => setData({ ...data, title: e.nativeEvent.text })}
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="pedal-bike" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          fontFamily={"body"}
        />
        <InputSectionCategory data={data} setData={setData} />
        <TextArea
          autoCompleteType={"description"}
          h={32}
          placeholder="description..."
          w="85%"
          maxW="container"
          onChange={(e) =>
            setData({ ...data, description: e.nativeEvent.text })
          }
          color={isDarkText}
        />
        <InputPriceButton data={data} setData={setData} />
        <Button
          color={"blue.300"}
          textDecorationColor={"amber.300"}
          textAlign={"center"}
          onPress={handleSubmit}
        >
          <Text
            style={{
              color: isDarkText,
              fontSize: 16,
            }}
          >
            Submit
          </Text>
        </Button>
        <Button
          color={"blue.300"}
          textDecorationColor={"amber.300"}
          textAlign={"center"}
          onPress={pickImage}
        >
          <Text
            style={{
              color: isDarkText,
              fontSize: 16,
            }}
          >
            Pick Image
          </Text>
        </Button>
        <Button
          color={"blue.300"}
          textDecorationColor={"amber.300"}
          textAlign={"center"}
          onPress={pickImageGallery}
        >
          <Text
            style={{
              color: isDarkText,
              fontSize: 16,
            }}
          >
            Pick Image Gallery
          </Text>
        </Button>
        {data.image?.map((item: any) => (
          <View key={item} style={styles.imageContainer}>
            <Image
              key={item}
              source={{ uri: item }}
              resizeMode="stretch"
              width={200}
              height={200}
              alt="image from gallery"
              style={{
                position: "relative",
              }}
            />
            <Pressable style={{ position: "absolute", top: 0, right: 0 }}>
              <Ionicons name="trash-outline" size={20} color={"red"} />
            </Pressable>
          </View>
        ))}
      </VStack>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: Platform.OS === "android" ? 100 : 0,
    marginTop: StatusBar.currentHeight,
  },
  imageContainer: {
    width: "auto",
    height: "auto",
    gap: 6,
    position: "relative",
  },
});
