import { ip } from "@/constants/IpAdress";
import axios from "axios";

export const useFetchProduct = async () => {
        try {
            const response = await axios(`${ip}/product`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
}