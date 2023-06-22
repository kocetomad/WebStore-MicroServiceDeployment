import { FaCartPlus } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import replaceAll from "./Util";

const StoreCard = ({item, setSelected}) => {
  const [Badge, setBadge] = useState(null)
  useEffect(() => {
    setBadge(item.item_tags)
  }, [])
  
  
  const Badges = () => {
    if (Badge !== null) {
      return Badge.map((item) => <div className="badge badge-outline">{item}</div>);
    } else {
      console.log("not loaded");
      return <div>Loading...</div>;
    }
  }

  const listingView = () => {
    document.getElementById("my-modal-9").checked = true;
    setSelected(item)
  }

  return (
    <div className="flex-none card w-96 bg-base-200 shadow-xl cursor-pointer hover:bg-base-300" onClick={() => listingView()}>
      <figure className="h-64 bg-white">
        <img
          src={'https://cmuvgvtjeycdnzjdufpa.supabase.co/storage/v1/object/public/item.imgs/' + item.item_name + "/thumbnails/1"}
          alt={'https://cmuvgvtjeycdnzjdufpa.supabase.co/storage/v1/object/public/item.imgs/' + item.item_name + "/thumbnails/1"}
          className="object-cover h-64 w-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
        {replaceAll(item.item_name,"_"," ")}
          <div className="badge badge-secondary">{item.item_featured}</div>
        </h2>
        <div className="flex gap-2">
          <Badges/>
        </div>
        <p className="flex text text-left mt-auto">
          {item.item_description.substr(0,30)}...
        </p>
        <div className="flex">
          <p className="font-bold text-4xl text-accent text-left">{item.item_price}£</p>
          <div className="btn-group">
            <button className="btn btn-active hover:bg-violet-600">Buy now</button>
            <button className="btn"><FaCartPlus size={20}/></button>
          </div>
        </div>
        <div className="card-actions justify-end"></div>
      </div>
    </div>
  );
};

export default StoreCard;
