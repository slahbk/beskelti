import React from "react";
import FlatLists from "./FlatLists";
import { useSelector } from "react-redux";

export default function ListTools() {
  const products = useSelector((state: any) => state.products);
  const data = products?.data?.filter((item: any) => item.section === "Tools");
  return (
    <>
      <FlatLists
        data={{
          title: "Tools",
          data: data,
        }}
      />
    </>
  );
}
