import { ImagePickerAsset } from "expo-image-picker";

export type ProductType = {
  userId: number;
  title: string;
  price: string;
  description: string;
  section: string;
  category: string;
  image: string[] | null;
};
