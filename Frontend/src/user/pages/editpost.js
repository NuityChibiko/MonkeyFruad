import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Formeditpost from "../components/formedit"
import "./editpost.css";
const Editpost = () => {
  return (
    <div>
      <Navbar />
      <h1 className="h1-editpost">แก้ไขโพสต์</h1>
      <Formeditpost/>
    </div>
  );
};

export default Editpost;
