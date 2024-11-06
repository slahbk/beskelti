import React from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  Image,
  Platform,
  Pressable,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import InputPriceButton from "@/components/UI/InputPriceButton";
import InputSectionCategory from "@/components/UI/InputSectionCategory";
import * as ImagePicker from "expo-image-picker";
import { ProductType } from "@/types/ProductType";
import Animated from "react-native-reanimated";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ToastManager, { Toast } from "toastify-react-native";
import { upload } from "cloudinary-react-native";
import Loading from "@/components/UI/Loading";
import { useDispatch } from "react-redux";
import { fetchProducts } from "@/redux/reducers/productSlice";
import { myCld, options } from "@/cloudinary/cldConfig";
import ButtonSubmit from "@/components/UI/ButtonSubmit";
import InputTitle from "@/components/UI/InputTitle";
import InputDescription from "@/components/UI/InputDescription";
import { router } from "expo-router";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Post() {
  const colorScheme = useColorScheme();
  const isDark = Colors[colorScheme ?? "light"];
  const dispatch = useDispatch();
  const [productData, setProductData] = React.useState<ProductType>({
    title: "test",
    price: "20",
    section: "Tools",
    category: "",
    description: "test",
    image: [],
    userId: 1,
  });
  const [uploadedImages, setUploadedImages] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [fixedProgress, setFixedProgress] = React.useState<number>(0);
  const [progress, setProgress] = React.useState<number>(0);
  const controller = new AbortController();

  React.useEffect(() => {
    (async () => {
      await AsyncStorage.getItem("token").then((token) => {
        if (!token) {
          Alert.alert("Your not logged in", " Please login first to post", [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "Sign Up",
              onPress: () => router.navigate("/auth/SignUp"),
              style: "default",
            },
            {
              text: "Log In",
              onPress: () => router.navigate("/auth/Login"),
              style: "default",
            },
          ]);
        }
      });
    })();
  }, []);

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
    controller.abort();
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
          <InputTitle
            productData={productData}
            setProductData={setProductData}
            isDark={isDark}
          />
          <InputSectionCategory data={productData} setData={setProductData} />
          <InputDescription
            productData={productData}
            setProductData={setProductData}
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
                <Animated.View style={styles.imageWrapper}>
                  <ImageBackground
                    source={{
                      uri: "https://res.cloudinary.com/dzxtonbuu/image/upload/v1730537104/beskelti%20app/yaeylehhb39xdocoicas.png",
                    }}
                    style={styles.image}
                    resizeMode="contain"
                  >
                    <Image
                      source={{ uri: item }}
                      resizeMode="contain"
                      style={styles.image}
                      alt={`Selected image ${index + 1}`}
                    />
                  </ImageBackground>
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
                </Animated.View>
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
    rowGap: 25,
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
    backgroundColor: "#22a6f1",
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
