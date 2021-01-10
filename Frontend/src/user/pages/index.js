import React, { useEffect, useState ,useContext} from "react";
import Navbar from "../components/navbar";
import usercontext from "../context/usercontext"
import axios from "axios";
const Home = () => {
  let { user , setUser} = useContext(usercontext)
  const [data , setData ]= useState()

  return (
    <div>
      <Navbar />
      <h1>Home</h1>
    </div>
  );
};

export default Home;
