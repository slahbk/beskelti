import React from "react";
import ListProducts from "@/components/common/ListProducts";
import { useSelector } from "react-redux";

export default function ListAccessories() {
  const products = useSelector((state: any) => state.products);
  const data = products?.data?.filter((item: any) => item.section === "Accessories");
  return (
    <>
      <ListProducts
        data={{
          title: "Accessories",
          data: data,
        }}
      />
    </>
  );
}
