import axios from "axios";

export const useFetchProduct = async () => {
  try {
    const response = await axios(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/product`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
