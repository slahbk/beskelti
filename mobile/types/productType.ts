import { ImagePickerAsset } from "expo-image-picker";

export type poroductType = {
    userId: number;
    title: string;
    price: string;
    description: string;
    section: string;
    category: string;
    image: ImagePickerAsset[] | null;
};