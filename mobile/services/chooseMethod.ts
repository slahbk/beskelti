import { ProductType } from "@/types/ProductType";
import * as ImagePicker from "expo-image-picker";
import { Toast } from "toastify-react-native";

export const chooseMethod = async (
  useCamera: boolean,
  setProductData: React.Dispatch<React.SetStateAction<ProductType>>
) => {
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
