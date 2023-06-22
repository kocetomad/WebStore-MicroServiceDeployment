import { async } from "@firebase/util";
import { useEffect, useState, ChangeEvent, CSSProperties } from "react";
import Carousel from "react-bootstrap/Carousel";
import { supabase } from "../db/supabase";
import { FaCartPlus } from "react-icons/fa";

const ListingView = ({ selected }) => {
  const [gallery, setGallery] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [imgsSize, imgsSetSize] = useState(0);
  const [Badge, setBadge] = useState(null);

  useEffect(() => {
    setBadge(selected.item_tags);
    getGallery(gallery);
    console.log(gallery)

  }, [selected]);

  const getGallery = async () => {
    const { data: gallery, error: err } = await supabase.storage
      .from("item.imgs")
      .list(selected.item_name + "/gallery");
    if (gallery) {
      const files = gallery.map((x) => `${selected.item_name}/${"gallery"}/${x.name}`);
      imgsSetSize(files.length);
      setGallery(files);
    }
  };

  const Badges = () => {
    if (Badge !== null) {
      return Badge.map((item) => (
        <div className="badge badge-outline">{item}</div>
      ));
    } else {
      console.log("not loaded");
      return <div>Loading...</div>;
    }
  };

  const MapCarousel = ({ carousel }) => {
    //console.log("state ", state)
    console.log("carousel", carousel);
    if (carousel !== null) {
      return carousel.map((item, index) => console.log(index));
    } else {
      console.log("not loaded");
      return <div>Loading...</div>;
    }
  };

  return (
    <div class="modal ">
      <div class="modal-box w-128">
        <label
          for="my-modal-9"
          class="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </label>
        <div className="carousel w-full mt-8">
          <div id={"slide" + 1} className="carousel-item relative w-full h-64">
            <img
              src={
                "https://cmuvgvtjeycdnzjdufpa.supabase.co/storage/v1/object/public/item.imgs/" +
                gallery[imageIndex]
              }
              className="w-full"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                className="btn btn-circle"
                onClick={() => {
                  if (imageIndex == 0) {
                    setImageIndex(imgsSize - 1);
                  } else {
                    setImageIndex(imageIndex - 1);
                  }
                }}
              >
                ❮
              </a>
              <a
                className="btn btn-circle"
                onClick={() => {
                  if (imageIndex == imgsSize - 1) {
                    setImageIndex(0);
                  } else {
                    setImageIndex(imageIndex + 1);
                  }
                }}
              >
                ❯
              </a>
            </div>
          </div>
        </div>
        <h3 class="text-lg font-bold">{selected.item_name}</h3>
        <Badges />
        <p class="py-4">{selected.item_description}</p>
        <div class="btn-group align-middle">
          <button class="btn btn-success w-full">Buy now</button>
          <button class="btn w-44">Add to besket&nbsp;&nbsp;<FaCartPlus/></button>
        </div>
      </div>
    </div>
  );
};
export default ListingView;
