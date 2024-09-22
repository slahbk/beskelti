import FlatLists from "./FlatLists";
import { useSelector } from "react-redux";

export default function ListAccessories() {
  const products = useSelector((state: any) => state.products);
  return (
    <>
      <FlatLists
        data={{
          title: "Accessories",
          data: products.data,
        }}
      />
    </>
  );
}
