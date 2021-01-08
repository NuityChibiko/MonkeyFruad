import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Formpost from "../components/formpost";
import "./createpost.css";
const Createpost = () => {
  return (
    <div className="allpage">
      <Navbar />
      <h1>สร้างโพสต์</h1>
      <Formpost />
    </div>
  );
};

export default Createpost;
