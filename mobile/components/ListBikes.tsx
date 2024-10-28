import React from "react";
import ListProducts from "./ListProducts";
import { useSelector } from "react-redux";

export default function ListBikes() {
  const products = useSelector((state: any) => state.products);
  const data = products?.data?.filter((item: any) => item.section === "Bikes");
  return (
    <>
      <ListProducts
        data={{
          title: "Bikes",
          data: data,
        }}
      />
    </>
  );
}
