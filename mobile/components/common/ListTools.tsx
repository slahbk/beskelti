import React from "react";
import ListProducts from "@/components/common/ListProducts";
import { useSelector } from "react-redux";

export default function ListTools() {
  const products = useSelector((state: any) => state.products);
  const data = products?.data?.filter((item: any) => item.section === "Tools");
  return (
    <>
      <ListProducts
        data={{
          title: "Tools",
          data: data,
        }}
      />
    </>
  );
}
