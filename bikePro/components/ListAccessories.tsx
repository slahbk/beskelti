import FlatLists from "./FlatLists";

export default function ListAccessories() {
  return (
    <>
      <FlatLists
        data={{
          title: "Accessories",
          data: [...new Array(2).keys()],
        }}
      />
    </>
  );
}
