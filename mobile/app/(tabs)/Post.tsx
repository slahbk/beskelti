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
  Text,
} from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import InputPriceButton from "@/components/UI/InputPriceButton";
import InputSectionCategory from "@/components/UI/InputSectionCategory";
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
import { jwtDecode, JwtPayload } from "jwt-decode";
import ButtonSubmit from "@/components/UI/ButtonSubmit";
import InputTitle from "@/components/UI/InputTitle";
import InputDescription from "@/components/UI/InputDescription";
import { router } from "expo-router";
import { chooseMethod } from "@/services/chooseMethod";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Post() {
  const colorScheme = useColorScheme();
  const isDark = Colors[colorScheme ?? "light"];
  const dispatch = useDispatch();
  const [productData, setProductData] = React.useState<ProductType>({
    userId: 0,
    title: "",
    price: "",
    section: "",
    category: "",
    description: "",
    image: [],
  });
  const [uploadedImages, setUploadedImages] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [progress, setProgress] = React.useState<number>(0);
  const controller = new AbortController();

  React.useEffect(() => {
    (async () => {
      await AsyncStorage.getItem("token").then(async (token) => {
        if (!token) {
          Alert.alert("Your not logged in", " Please login first to post", [
            {
              text: "Cancel",
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
        } else {
          try {
            await axios.post(
              `${process.env.EXPO_PUBLIC_IP_ADDRESS}/api/auth/check-token`,
              {
                token: token,
              }
            );
          } catch (error) {
            console.log(error);
            router.replace("/auth/Login");
          }
        }
      });
    })();
  }, [productData]);

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem("token");
    const decodedToken = jwtDecode<JwtPayload>(token as string);
    if (token) {
      productData.userId = Number(decodedToken.sub);
      const res = await axios.post(
        `${process.env.EXPO_PUBLIC_IP_ADDRESS}/api/auth/check-token`,
        {
          token: token,
        }
      );
      if (res.status !== 200) {
        Toast.error("expired login");
        router.replace("/auth/Login");
      }
    } else {
      Toast.error("expired login");
      router.replace("/auth/Login");
    }
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
      if (error === "auth error - invalid token") {
        router.replace("/auth/Login");
      }
      setIsLoading(false);
      setProgress(0);
      Toast.error("Failed to add product");
      setUploadedImages([]);
    }
  };

  const handleUpload = async () => {
    productData.image = uploadedImages;
    await axios.post(
      `${process.env.EXPO_PUBLIC_IP_ADDRESS}/api/product/add`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      }
    );
    setIsLoading(false);
    Toast.success("Product Added Successfully");
    dispatch(fetchProducts() as any);
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
    setProgress(0);
  };

  const pickImage = async (useCamera: boolean) => {
    await chooseMethod(useCamera, setProductData);
  };

  const removeImage = (index: number) => {
    setProductData((prevData: ProductType) => ({
      ...prevData,
      image: prevData.image
        ? prevData.image.filter((_, i) => i !== index)
        : null,
    }));
  };

  return (
    <>
      {isLoading && (
        <Loading
          progress={(progress / (productData?.image?.length ?? 0)) * 10}
          setIsLoading={setIsLoading}
          handleExit={handleExit}
        />
      )}
      <ToastManager textStyle={styles.toastText} position="top" />
      <Animated.ScrollView
        contentContainerStyle={styles.container}
        style={{ backgroundColor: isDark.background }}
        showsVerticalScrollIndicator={true}
        alwaysBounceVertical
      >
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
            <View style={{ width: "95%" }}>
              <Text style={styles.imageCount}>
                {productData.image.length} Images Selected
              </Text>
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
                      resizeMode="cover"
                    >
                      <Image
                        source={{ uri: item }}
                        resizeMode="cover"
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
            </View>
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
    marginRight: SCREEN_WIDTH * 0.03,
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
    borderRadius: 12,
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
  imageCount: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "gray",
    alignSelf: "baseline",
  },
});
