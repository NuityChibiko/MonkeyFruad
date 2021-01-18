import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import "./contractus.css";
import Chatbot from "../components/chatbot";
const Contractus = () => {

  return (
    <div>
      <Navbar />
      <h1 className="h1-contractus">ติดต่อเรา</h1>
      <Chatbot/>
    </div>
  );
};

export default Contractus;
