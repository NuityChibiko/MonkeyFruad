import React, { useEffect, useState ,useContext} from "react";
import Navbar from "../components/navbar";
import usercontext from "../context/usercontext"
import axios from "axios";
import {
  auth,
  googleProvider,
  facebookProvider,
} from "../Frontfirebase";
const Home = () => {
  const [data , setData ]= useState()
  var user = auth.currentUser;
const ok = () =>{

  if (user) {
   console.log(user.email)
  } else {
    console.log("error")
  }
}

useEffect(() => {
ok()
}, [user])

  return (
    <div>
      <Navbar />

      <h1>Home</h1>
      {/* <a onClick={submit}>enter</a> */}
    </div>
  );
};

export default Home;
