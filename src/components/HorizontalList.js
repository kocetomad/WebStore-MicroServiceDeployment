import StoreCard from "./StoreCard";
import React, { useEffect, useState } from "react";
import { getAllItems, getAllTrending, getAllTop } from "../db/supabase";


const HorizontalList = ({item_featured, setSelected}) => {
  const [trendingList, setTrending] = useState(null);
  const [topList, setTop] = useState(null);

  useEffect(() => {
    if(item_featured == "top"){
      getAllTop().then((value) => setTrending(value));
    }
    else if(item_featured == "trending"){
      getAllTrending().then((value) => setTrending(value));
    }else{
      getAllItems().then((value) => setTrending(value));
    }
  }, []);

  const ItemsList = () => {
    //console.log("state ", state)
    if (trendingList !== null) {
      return trendingList.map((item, index) => <StoreCard item={item} setSelected={setSelected}/>);
    } else {
      console.log("not loaded");
      return <div>Loading...</div>;
    }
  };

  return (
    <div className="flex flex-nowrap overflow-auto gap-4">
      <ItemsList/>
    </div>
  );
};

export default HorizontalList;