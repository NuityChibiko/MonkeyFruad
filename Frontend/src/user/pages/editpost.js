import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Formpost from "../components/formpost"
import "./editpost.css";
const Editpost = () => {
  return (
    <div>
      <Navbar />
      <h1>แก้ไขโพสต์</h1>
      <Formpost />
    </div>
  );
};

export default Editpost;
