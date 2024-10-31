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
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import InputPriceButton from "@/components/UI/InputPriceButton";
import InputSectionCategory from "@/components/UI/InputSectionCategory";
import * as ImagePicker from "expo-image-picker";
import { ProductType } from "@/types/ProductType";
import Animated from "react-native-reanimated";
import axios from "axios";

import ToastManager, { Toast } from "toastify-react-native";
import { upload } from "cloudinary-react-native";
import Loading from "@/components/UI/Loading";
import { useDispatch } from "react-redux";
import { fetchProducts } from "@/redux/reducers/productSlice";
import { myCld, options } from "@/cloudinary/cldConfig";
import ButtonSubmit from "@/components/UI/ButtonSubmit";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Post() {
  const colorScheme = useColorScheme();
  const isDark = Colors[colorScheme ?? "light"];
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
        style={{ backgroundColor: isDark.background }}
        showsVerticalScrollIndicator={true}
      >
        <ToastManager textStyle={styles.toastText} position="top" />
        <Animated.View style={styles.form}>
        <InputPriceButton data={productData} setData={setProductData} />

          <Animated.View
            style={{
              position: "relative",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: isDark.border,
                  color: isDark.text,
                  paddingHorizontal: SCREEN_WIDTH * 0.12,
                },
              ]}
              value={productData.title}
              placeholder="Title..."
              placeholderTextColor={"gray"}
              onChangeText={(text) =>
                setProductData({ ...productData, title: text })
              }
            />
            <MaterialIcons
              name="pedal-bike"
              style={{ position: "absolute", left: SCREEN_WIDTH * 0.08 }}
              size={25}
              color="gray"
            />
          </Animated.View>
          <InputSectionCategory data={productData} setData={setProductData} />
          <TextInput
            style={[
              styles.input,
              {
                height: "auto",
                textAlignVertical: "top",
                padding: 10,
                borderColor: isDark.border,
                color: isDark.text,
              },
            ]}
            placeholder="Description..."
            placeholderTextColor={"gray"}
            value={productData.description}
            onChangeText={(text) =>
              setProductData({ ...productData, description: text })
            }
            numberOfLines={5}
            multiline
          />
          <Animated.View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              width: "90%",
            }}
          >
            <View style={{ flexDirection: "row", gap: 5 }}>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={() => pickImage(true)}
              >
                <Ionicons
                  name="camera-outline"
                  size={SCREEN_WIDTH * 0.07}
                  color={"white"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={() => pickImage(false)}
              >
                <Ionicons
                  name="images-outline"
                  size={SCREEN_WIDTH * 0.07}
                  color={"white"}
                />
              </TouchableOpacity>
            </View>
            <ButtonSubmit 
              productData={productData}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </Animated.View>
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
                    defaultSource={require("@/assets/images/placeholder.png")}
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
        </Animated.View>
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
  form: {
    gap: 25,
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "90%",
    height: SCREEN_HEIGHT * 0.06,
    borderWidth: 1,
    borderRadius: 5,
    position: "relative",
    paddingHorizontal: 10,
  },
  button: {
    width: "auto",
    padding: 10,
    height: SCREEN_WIDTH * 0.12,
    backgroundColor: "#1dacd6",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
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
