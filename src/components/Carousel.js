import React, { useEffect, useState } from "react";
import { auth, db, logout } from "./Firebase";
import { getAllItems } from "../db/supabase";
import replaceAll from "./Util";

const Carousel = () => {
  const [carousel, loadCarousel] = useState(null);

  useEffect(() => {
    getAllItems().then((value) => loadCarousel(value));
  }, []);

  const MapHotItems = () => {
    //console.log("state ", state)
    console.log("carousel", carousel);
    if (carousel !== null) {
      return carousel.map((item, index) => (
        <div id={"item" + (index + 1)} className="carousel-item w-full">
          <div className="hero bg-base-200">
            <div className="hero-content flex-col lg:flex-row ">
              <img
                src={
                  "https://cmuvgvtjeycdnzjdufpa.supabase.co/storage/v1/object/public/item.imgs/" +
                  item.item_name +
                  "/thumbnails/1"
                }
                alt={
                  "https://cmuvgvtjeycdnzjdufpa.supabase.co/storage/v1/object/public/item.imgs/" +
                  item.item_name +
                  "/thumbnails/1"
                }
                className="object-contain rounded-lg shadow-2xl h-96 w-128"
              />
              <div className="relative h-min">
                <h1 className="text-5xl font-bold position">
                  {replaceAll(item.item_name, "_", " ")}
                </h1>
                <p className="mt-6 text-left">{item.item_description}</p>
                <p className="font-bold text-3xl text-accent text-left absolute bottom-0 left-0">
                  {item.item_price}£
                </p>
                <button className="btn btn-primary float-right ">
                  View Game
                </button>
              </div>
            </div>
          </div>
        </div>
      ));
    } else {
      console.log("not loaded");
      return <div>Loading...</div>;
    }
  };

  return (
    <div>
      <div className="carousel w-full">


        <MapHotItems />
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        <a href="#item1" className="btn btn-xs" onClick={() => {return false}}>
          1
        </a>
        <a href="#item2" className="btn btn-xs" onClick={() => {return false}}>
          2
        </a>
        <a href="#item3" className="btn btn-xs" onClick={() => {return false}}>
          3
        </a>
        <a href="#item4" className="btn btn-xs" onClick={() => {return false}}>
          4
        </a>
      </div>
    </div>
  );
};

export default Carousel;
