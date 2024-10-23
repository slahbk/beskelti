import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Pressable,
  Dimensions,
} from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { Icon, Input, TextArea, VStack, Button } from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import InputPriceButton from "@/components/InputPriceButton";
import InputSectionCategory from "@/components/InputSectionCategory";
import * as ImagePicker from "expo-image-picker";
import { ProductType } from "@/types/ProductType";
import Animated from "react-native-reanimated";
import axios from "axios";

import ToastManager, { Toast } from "toastify-react-native";
import { upload } from "cloudinary-react-native";
import Loading from "@/components/Loading";
import { useDispatch } from "react-redux";
import { fetchProducts } from "@/redux/reducers/productSlice";
import { myCld, options } from "../../cloudinary/cldConfig";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Post() {
  const colorScheme = useColorScheme();
  const isDark = Colors[colorScheme ?? "light"].background;
  const isDarkText = Colors[colorScheme ?? "light"].text;
  const dispatch = useDispatch();
  const [productData, setProductData] = useState<ProductType>({
    title: "test",
    price: "20",
    section: "Tools",
    category: "",
    description: "test",
    image: [],
    userId: 1,
  });
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fixedProgress, setFixedProgress] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [exit, setExit] = useState(false);

  // useEffect(() => {
  //   const userId = SecureStore.getItem("userId");
  //   const token = SecureStore.getItem("token");
  //   if (!token) {
  //     Redirect({ href: "/" });
  //   }
  //   if (userId) {
  //     setProductData({ ...productData, userId: parseInt(userId) });
  //   }
  // }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      productData.image?.forEach(async (image) => {
        await upload(myCld, {
          file: image,
          options: options,
          callback: async (err, result) => {
            if (err) {
              Toast.error("Error uploading image");
              setUploadedImages([]);
              setIsLoading(false);
              setProgress(0);
              return;
            } else if (result) {
              uploadedImages.push(result.secure_url);
              setProgress((prevProgress) => prevProgress + 1);
              if (
                uploadedImages &&
                productData.image &&
                uploadedImages.length === productData.image.length
              ) {
                console.log("All images uploaded successfully");
                handleUpload();
              }
            }
          },
        });
      });
    } catch (error) {
      setIsLoading(false);
      setProgress(0);
      Toast.error("Failed to add product");
      setUploadedImages([]);
    }
    // const id = "8";
    // const token = "lisbfvilqerjk-----sdfvefdv-------_sbviulsbvhhsfv";
    // SecureStore.setItemAsync("userId", id);
    // SecureStore.setItemAsync("token", token);
  };

  const handleUpload = async () => {
    setTimeout(async () => {
      Toast.success("Product Added Successfully");
      dispatch(fetchProducts() as any);
    }, 1000);
    productData.image = uploadedImages;
    await axios.post(
      `${process.env.EXPO_PUBLIC_IP_ADDRESS}/product/add`,
      productData
    );
    setIsLoading(false);
    resetForm();
    resetProgress();
  };

  const handleExit = () => {
    setExit(true);
    setProgress(0);
    setUploadedImages([]);
    Toast.error("Product Not Added");
    return;
  };

  const resetForm = () => {
    setProductData({
      title: "",
      price: "",
      section: "",
      category: "",
      description: "",
      image: [],
      userId: 1,
    });
    setUploadedImages([]);
  };

  const resetProgress = () => {
    setFixedProgress(0);
    setProgress(0);
  };

  const pickImage = async (useCamera: boolean) => {
    try {
      const permissionMethod = useCamera
        ? ImagePicker.requestCameraPermissionsAsync
        : ImagePicker.requestMediaLibraryPermissionsAsync;
      const { status } = await permissionMethod();

      if (status !== "granted") {
        Toast.error("Permission denied");
        return;
      }

      const result = useCamera
        ? await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.4,
          })
        : await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 0.4,
            allowsMultipleSelection: true,
            selectionLimit: 5,
          });

      if (!result.canceled && result.assets) {
        const newImageUris = result.assets.map((asset) => asset.uri);
        setFixedProgress((prevProgress) => prevProgress + newImageUris.length);
        setProductData((prevData) => ({
          ...prevData,
          image: prevData.image
            ? [...prevData.image, ...newImageUris]
            : newImageUris,
        }));
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Toast.error("Failed to pick image");
    }
  };
  const removeImage = (index: number) => {
    setProductData((prevData: ProductType) => ({
      ...prevData,
      image: prevData.image
        ? prevData.image.filter((_, i) => i !== index)
        : null,
    }));
    setFixedProgress((prevProgress) => prevProgress - 1);
  };

  return (
    <>
      {isLoading && (
        <Loading
          progress={(progress / fixedProgress) * 10}
          setIsLoading={setIsLoading}
          handleExit={handleExit}
        />
      )}
      <Animated.ScrollView
        contentContainerStyle={styles.container}
        style={{ backgroundColor: isDark }}
        showsVerticalScrollIndicator={true}
      >
        <ToastManager textStyle={styles.toastText} position="top" />
        <VStack space={4} w="100%" alignItems="center">
          <Input
            w={{
              base: "90%",
              md: "70%",
              lg: "50%",
            }}
            placeholder="Title"
            color={isDarkText}
            value={productData.title}
            onChangeText={(text) =>
              setProductData({ ...productData, title: text })
            }
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
          <InputSectionCategory data={productData} setData={setProductData} />
          <TextArea
            autoCompleteType={"off"}
            h={SCREEN_HEIGHT * 0.15}
            placeholder="Description..."
            w={{
              base: "90%",
              md: "70%",
              lg: "50%",
            }}
            maxW="container"
            value={productData.description}
            onChangeText={(text) =>
              setProductData({ ...productData, description: text })
            }
            color={isDarkText}
          />
          <InputPriceButton data={productData} setData={setProductData} />
          <Button
            w={{
              base: "90%",
              md: "70%",
              lg: "50%",
            }}
            colorScheme="blue"
            onPress={handleSubmit}
            isDisabled={
              productData.title === "" ||
              productData.price === "" ||
              productData.section === "" ||
              (productData.section === "Bikes" &&
                productData.category === "") ||
              productData.image?.length === 0 ||
              isLoading
            }
          >
            <Text style={styles.buttonText}>Submit</Text>
          </Button>
          <Button
            w={{
              base: "90%",
              md: "70%",
              lg: "50%",
            }}
            colorScheme="blue"
            onPress={() => pickImage(true)}
            isDisabled={isLoading}
          >
            <Text style={styles.buttonText}>Take Photo</Text>
          </Button>
          <Button
            w={{
              base: "90%",
              md: "70%",
              lg: "50%",
            }}
            colorScheme="blue"
            onPress={() => pickImage(false)}
            isDisabled={isLoading}
          >
            <Text style={styles.buttonText}>Pick from Gallery</Text>
          </Button>
          {productData.image && productData.image.length > 0 && (
            <Animated.FlatList
              data={productData.image}
              horizontal
              renderItem={({ item, index }) => (
                <View style={styles.imageWrapper}>
                  <Image
                    source={{ uri: item }}
                    resizeMode="cover"
                    style={styles.image}
                    alt={`Selected image ${index + 1}`}
                  />
                  <Pressable
                    style={styles.deleteButton}
                    onPress={() => removeImage(index)}
                  >
                    <Ionicons
                      name="trash-outline"
                      size={SCREEN_WIDTH * 0.05}
                      color="red"
                    />
                  </Pressable>
                </View>
              )}
              keyExtractor={(item, index) => `${item}-${index}`}
            />
          )}
        </VStack>
      </Animated.ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: Platform.OS === "android" ? SCREEN_HEIGHT * 0.1 : 0,
    marginTop: StatusBar.currentHeight,
  },
  imageWrapper: {
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_WIDTH * 0.4,
    marginRight: SCREEN_WIDTH * 0.02,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  deleteButton: {
    position: "absolute",
    top: SCREEN_WIDTH * 0.02,
    right: SCREEN_WIDTH * 0.02,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: SCREEN_WIDTH * 0.02,
    padding: SCREEN_WIDTH * 0.01,
  },
  buttonText: {
    color: "white",
    fontSize: SCREEN_WIDTH * 0.04,
  },
  toastText: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
});
