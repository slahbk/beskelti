import { ProductType } from "./ProductType";
export interface UserType {
  id?: number;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  token?: string;
  company: string;
  avatar: string;
  phone: string;
  products?: ProductType[]
};
