import React from "react";
import FlatLists from "./FlatLists";
import { useSelector } from "react-redux";

export default function ListBikes() {
  const products = useSelector((state: any) => state.products);

  return (
    <>
      <FlatLists
        data={{
          title: "Bikes",
          data: products.data,
        }}
      />
    </>
  );
}
