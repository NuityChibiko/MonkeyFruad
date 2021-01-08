import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Formeditpost from "../components/formeditpost"
import "./editpost.css";
const Editpost = () => {
  return (
    <div>
      <Navbar />
      <h1>แก้ไขโพสต์</h1>
      <Formeditpost />
    </div>
  );
};

export default Editpost;
