import React from "react";
import FlatLists from "./FlatLists";
import { useSelector } from "react-redux";

export default function ListTools() {
  const products = useSelector((state: any) => state.products);
  return (
    <>
      <FlatLists
        data={{
          title: "Tools",
          data: products.data,
        }}
      />
    </>
  );
}
