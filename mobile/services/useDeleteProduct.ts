import axios from "axios";

export const handleDeleteProduct = async (id: number) => {
    try {
      await axios.delete(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/api/product/delete/${id}`);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
}