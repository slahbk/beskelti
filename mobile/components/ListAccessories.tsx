import FlatLists from "./FlatLists";
import { useSelector } from "react-redux";

export default function ListAccessories() {
  const products = useSelector((state: any) => state.products);
  const data = products.data.filter((item: any) => item.section === "Accessories");
  return (
    <>
      <FlatLists
        data={{
          title: "Accessories",
          data: data,
        }}
      />
    </>
  );
}
