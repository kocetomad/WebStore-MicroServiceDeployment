import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import { auth, db, logout } from "../../Firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import NavBar from "../../Navbar";
import HorizontalList from "../../HorizontalList"
import Carousel from "../../Carousel";
import { FaTrash,FaEdit,FaPlusSquare,FaKey, FaList} from 'react-icons/fa';
import { getAllItems } from "../../../db/supabase";
import ListingView from "../../ListingView";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [selected, setSelected] = useState({item_name: "",item_description : "", item_tags: [""],item_price : 0, item_featured: ""});

  const viewAllItems = () => {
    navigate("/allProducts")
  }

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);
  return (
    <div className="store__container">

      <input type="checkbox" id="my-modal-9" class="modal-toggle" />
      <ListingView selected={selected}/>

      <div className="store">
        <NavBar />
        <Carousel />
        <div className="flex flex-col mx-8">
          <p className="font-bold text-3xl text-left">Top Sellers 🤯</p>
          <div className="divider"></div>
          <HorizontalList item_featured={"top"} setSelected={setSelected}/>
        </div>
        <div className="flex flex-col mx-8 mt-3">
          <p className="font-bold text-3xl text-left">Trending 🔥</p>
          <div className="divider"></div>
          <HorizontalList item_featured={"trending"} setSelected={setSelected}/>
        </div>
        <div className="my-8 px-8">
        <button className="flex-1 btn btn-primary w-full" onClick={() => viewAllItems()}>View all products&nbsp;&nbsp;<FaList/></button>
        </div>
        
      </div>
    </div>
  );
}
export default Dashboard;
