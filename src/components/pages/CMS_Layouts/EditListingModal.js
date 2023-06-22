import { FaPlusSquare } from "react-icons/fa";
import { useEffect, useState, ChangeEvent, CSSProperties } from "react";
import { insertItem } from "../../../db/supabase";
import { uploadImages } from "../../../db/supabase";
import { supabase } from "../../../db/supabase";
import replaceAll from "../../Util";
import { getAllItems } from "../../../db/supabase";
import HashLoader from "react-spinners/HashLoader";

const EditListingModal = ({ editted, setProductList }) => {
  const [selectedFile, setSelectedFile] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    console.log("");
    setDescription(editted.item_description);
    setPrice(editted.item_price);
  }, [editted]);

  const InsertListing = async () => {
    document.getElementById("my-modal").checked = true;

    const { data, error } = await supabase
      .from("store_items")
      .update({ item_description: description, item_price: price })
      .match({ item_name: editted.item_name });
    if (data == null && error == null) {
      document.getElementById("my-modal").checked = false;
      document.getElementById("my-modal-7").checked = false;
      getAllItems().then((value) => setProductList(value));
    }
  };

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <div class="modal modal-bottom sm:modal-middle">
      <div class="modal-box justify-start">
        <label
          for="my-modal-7"
          class="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </label>
        <div class="text-left">
          <input type="checkbox" id="my-modal" class="modal-toggle" />
          <div class="modal">
            <div class="modal-open ">
              <div class="modal-box pr-8">
                <HashLoader color="#36d7b7" class="ml-4" />
                <p class="py-1 text-center">Publishing...</p>
              </div>
            </div>
          </div>

          <h3 class="font-bold text-lg mb-2">Update listing:</h3>
          <p class="py-1 pt-3">Item description:</p>
          <textarea
            class="textarea textarea-primary w-full max-w-xs"
            placeholder="Bio"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>

          <p class="py-1 pt-3">Item Price (must be a number):</p>
          <input
            type="number"
            placeholder="Enter price"
            class="input input-bordered input-accent w-64 max-w-xs"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />

          <div class="modal-action">
            <label
              for="my-modal-6"
              class="btn w-full btn-success"
              onClick={() => InsertListing()}
            >
              Update listing
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditListingModal;
