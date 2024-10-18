import { IP_ADDRESS } from "@/constants/ApiConfig";
import axios from "axios";

export const useFetchProduct = async () => {
  try {
    const response = await axios(`${IP_ADDRESS}/product`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
