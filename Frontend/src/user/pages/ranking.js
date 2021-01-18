import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import "./ranking.css";
import Chatbot from "../components/chatbot";
const Rank = () => {
  return (
    <div>
      <Navbar />
      <h1 className="h1-ranking">จัดอันดับคนโกง</h1>
      <Chatbot/>
    </div>
  );
};
export default Rank;
