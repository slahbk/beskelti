import React from "react";
import FlatLists from "./FlatLists";

export default function ListBikes() {
  return (
    <>
      <FlatLists
        data={{
          title: "Bikes",
          data: [...new Array(5).keys()],
        }}
      />
    </>
  );
}
