import { FaTrash, FaEdit, FaPlusSquare, FaKey } from "react-icons/fa";
import NewItemModal from "./AddNewLisingModal";
import { getAllItems, supabase } from "../../../db/supabase";
import React, { useEffect, useState } from "react";
import replaceAll from "../../Util";
import { async } from "@firebase/util";
import EditListingModal from "./EditListingModal";

const InventoryList = () => {
  const [productList, setProductList] = useState(null);
  const [modalVis, setModalVis] = useState(false);
  const [editted, setEditted] = useState({item_description : "",item_description : 0});


  useEffect(() => {
    getAllItems().then((value) => setProductList(value));
  }, []);

  const deleteItem = async (item_name) => {
    console.log(item_name);
    const {} = await supabase
      .from("store_items")
      .delete()
      .eq("item_name", item_name);
    deleteItemPics(item_name);
    getAllItems().then((value) => setProductList(value));
  };
  const deleteItemPics = async (item_name) => {
    const { data: gallery, error: err } = await supabase.storage
      .from("item.imgs")
      .list(item_name + "/gallery");
    console.log(gallery);

    const { data, error } = await supabase.storage
      .from("item.imgs")
      .remove(item_name + "/thumbnails/1");
    if (error) {
      console.log(error);
    }
    if (gallery) {
      const filesToRemove = gallery.map(
        (x) => `${item_name}/${"gallery"}/${x.name}`
      );
      const { data, error } = await supabase.storage
        .from("item.imgs")
        .remove(filesToRemove);
    }

  };

  const updateItem = async (item) => {
    document.getElementById("my-modal-7").checked = true
    console.log(item);
    setEditted(item)

  };

  const ItemsList = ({ list }) => {
    //console.log("state ", state)
    if (list !== null) {
      return list.map((item, index) => (
        <tr>
          <th>{index}</th>
          <td>{replaceAll(item.item_name, "_", " ")}</td>
          <td>{item.item_description.substring(0, 40) + "..."}</td>
          <td>{item.item_price}£</td>
          <th>
            <button
              className="btn btn-square bg-error"
              onClick={() => deleteItem(item.item_name)}
            >
              <FaTrash color="white" />
            </button>
            <button
              className="btn btn-square bg-info"
              onClick={() =>
                updateItem(item)
              }
            >
              <FaEdit color="white" />
            </button>
          </th>
        </tr>
      ));
    } else {
      console.log("not loaded");
      return <div>Loading...</div>;
    }
  };

  return (
    <div className="overflow-x-auto mx-8">
      <input type="checkbox" id="my-modal-3" class="modal-toggle" />
      {modalVis ? (
        <NewItemModal setVis={setModalVis} setProductList={setProductList} />
      ) : (
        ""
      )}
      <input type="checkbox" id="my-modal-7" class="modal-toggle" />
      <EditListingModal editted={editted} setProductList={setProductList}/>
      <div className="btn-group btn-group-vertical lg:btn-group-horizontal flex ">
        <label
          for="my-modal-3"
          class="flex-1 btn btn-success"
          onClick={() => setModalVis(true)}
        >
          Add new listing <FaPlusSquare />
        </label>
        <label for="my-modal-3" class="flex-1 btn btn-secondary rounded-t-lg">
          Add new standalone key <FaKey />
        </label>
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th className="w-0">Name</th>
            <th>description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <ItemsList list={productList} />
        </tbody>
      </table>
    </div>
  );
};
export default InventoryList;
