import { FaPlusSquare } from "react-icons/fa";
import { useEffect, useState, ChangeEvent, CSSProperties } from "react";
import { insertItem } from "../../../db/supabase";
import { uploadImages } from "../../../db/supabase";
import { supabase } from "../../../db/supabase";
import replaceAll from "../../Util";
import { getAllItems } from "../../../db/supabase";
import HashLoader from "react-spinners/HashLoader";

const TagList = ({ size }) => {
  return [...Array(size)].map((e, index) => (
    <input
      type="text"
      placeholder="Enter tag name"
      class="input input-bordered input-primary w-40 max-w-xs"
      onChange={(e) => (tagsList[index] = e.target.value)}
    />
  ));
};
let tagsList = [""];

const NewItemModal = ({ setVis, setProductList }) => {
  const [tagsCount, setTagsCount] = useState(1);
  const [selectedFile, setSelectedFile] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([""]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    // document.getElementById("my-modal").checked = true;
  }, [])
  const backup = async(item) => {
    let body = {
      id: 1,
      item_name: item.item_name+"",
      item_description: item.item_description,
      item_tags: item.item_tags+"",
      item_price: item.item_price+"",
      item_featured: "-",
    };
    console.log(body)
      const response = await fetch(
        "https://backup-qu3bw5fxjq-nw.a.run.app",
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(body),
        }
      );
        console.log(response)
  }
  
  const handleUpload = async (e) => {
    let file;

    if (e.target.files) {
      file = e.target.files[0];
    }
    setSelectedFile(e.target.files);
  };

  const InsertListing = async () => {
    let item = [
      {
        item_name: replaceAll(title, " ", "_"),
        item_description: description,
        item_tags: tagsList,
        item_price: price,
      },
    ];
    insertItem(item).then(async (value) => {
      document.getElementById("my-modal").checked = true;
      console.log(value);
      if (value.data == null && value.error == null) {
        const { data, error } = await supabase.storage
          .from("item.imgs")
          .upload(
            replaceAll(title, " ", "_") +
              "/thumbnails/" +
              "1",
            selectedFile[0]
          );
        if (selectedFile.length > 1) {
          for (let index = 1; index < selectedFile.length; index++) {
            const element = selectedFile[index];
            const { data, error } = await supabase.storage
              .from("item.imgs")
              .upload(
                replaceAll(title, " ", "_") + "/gallery/" + index,
                element
              );
          }
        }

        if (data) {
          console.log(data);
          setVis(false);
          document.getElementById("my-modal").checked = false;
          backup(item[0]).catch((error) => {
            console.error(error);
          })
          getAllItems().then((value) => setProductList(value));
        } else if (error) {
          console.log(error);
        }
      }
    });
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
          for="my-modal-3"
          class="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </label>
        <div class="text-left">
          <input type="checkbox" id="my-modal" class="modal-toggle" />
          <div class="modal">
            <div class="modal-open ">
              <div class="modal-box pr-8">
              <HashLoader color="#36d7b7" class="ml-4"/>
              <p class="py-1 text-center">Publishing...</p>

              </div>
            </div>
          </div>

          <h3 class="font-bold text-lg mb-2">Add new item:</h3>
          <p class="py-1">Item name:</p>
          <input
            type="text"
            placeholder="Enter item name"
            class="input input-bordered input-primary w-full max-w-xs"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <p class="py-1 pt-3">Item description:</p>
          <textarea
            class="textarea textarea-primary w-full max-w-xs"
            placeholder="Bio"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
          <p class="py-1 pt-3">Item tags:</p>
          <div className="flex flex-nowrap overflow-auto gap-4">
            <TagList size={tagsCount} />
          </div>
          <button
            class="btn gap-2 mt-2 btn-secondary"
            onClick={() => {
              setTagsCount(tagsCount + 1);
              tagsList.push("");
              console.log(tagsList);
            }}
          >
            Add new tag
            <FaPlusSquare />
          </button>
          <p class="py-1 pt-3">Item Price (must be a number):</p>
          <input
            type="number"
            placeholder="Enter price"
            class="input input-bordered input-accent w-64 max-w-xs"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
          <p class="py-1 pt-3">
            Images (First Image would bse used as a <b>Thumbnail</b>):
          </p>
          <div class="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-7">
                <svg
                  aria-hidden="true"
                  class="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {selectedFile == ""
                    ? "The first image uploaded will be used as a thumbnail"
                    : selectedFile.length + " files uploaded"}
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                class="hidden"
                multiple="multiple"
                accept=".png,.jpg,.jpeg,.webp"
                onChange={(e) => handleUpload(e)}
              />
            </label>
          </div>

          <div class="modal-action">
            <label
              for="my-modal-6"
              class="btn w-full btn-success"
              onClick={() => InsertListing()}
            >
              Publish listing
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewItemModal;
