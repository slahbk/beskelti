import axios from "axios";

export const useFetchUser = async ({ userId }: { userId: number }) => {
  try {
    const response = await axios(
      `${process.env.EXPO_PUBLIC_IP_ADDRESS}/api/user/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
