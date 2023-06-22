import SmallCard from "./SmallCard";
import React, { useEffect, useState } from "react";
import { getAllItems } from "../db/supabase";

const VerticalList = ({setSelected}) => {
  const [productList, setProductList] = useState(null);

  useEffect(() => {
    getAllItems().then((value) => setProductList(value));
  }, []);

  const ItemsList = () => {
    //console.log("state ", state)
    if (productList !== null) {
      return productList.map((item, index) => <SmallCard item={item} setSelected={setSelected}/>);
    } else {
      console.log("not loaded");
      return <div>Loading...</div>;
    }
  };

  return (
    <div className="flex flex-wrap overflow-auto gap-5 ">
      <ItemsList/>
    </div>
  );
};

export default VerticalList;
