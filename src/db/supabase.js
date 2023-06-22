import { createClient } from "@supabase/supabase-js";
import test from "../images/logo192.png";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

const getAllItems = async () => {
  let { data, error } = await supabase.from("store_items").select("*");
  if (error) {
    return error;
  } else {
    return data;
  }
};

const getAllTrending = async () => {
  let { data, error } = await supabase.from("store_items").select("*").eq("item_featured","Trending");
  if (error) {
    return error;
  } else {
    return data;
  }
};

const getAllTop = async () => {
  let { data, error } = await supabase.from("store_items").select("*").eq("item_featured","Top");
  if (error) {
    return error;
  } else {
    return data;
  }
};

const insertItem = async (item) => {
  const { data, error } = await supabase.from("store_items").insert(item);
  return { data, error };
};

export async function base64ToFile(dataURL) {
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  return fetch(dataURL).then(function (result) {
    return result.arrayBuffer();
  });
}

const uploadImages = async ({ file }) => {
  const avatarFile = file;

  const { data, error } = await supabase.storage
    .from("item.imgs")
    .upload("12.jpg", avatarFile, {
      cacheControl: "3600",
      upsert: false,
      contentType: "image/jpg",
    });
  return { data, error };
};

export { getAllItems, insertItem, uploadImages, getAllTrending, getAllTop };
