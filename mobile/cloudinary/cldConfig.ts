import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "@/constants/ApiConfig";
import { Cloudinary } from "@cloudinary/url-gen";

export const myCld = new Cloudinary({
  cloud: {
    cloudName: CLOUDINARY_CLOUD_NAME,
    apiKey: CLOUDINARY_API_KEY,
    apiSecret: CLOUDINARY_API_SECRET,
  },
  url: {
      secure: true
  }
});

export const options = {
    overwrite: true,
    invalidate: false,
    folder: "beskelti app",
  }