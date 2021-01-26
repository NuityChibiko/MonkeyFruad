import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Rule from"../components/rule";
import "./linkruleshow.css";
import Chatbot from "../components/chatbot";
import NavbarPage from "../components/navnew";
const Linkruleshow = () => {
  return (
    <div>
<<<<<<< HEAD
      <Navbar />
      <h1 className="h1-linkruleshow">ข้อกำหนดและเงื่อนไขการใช้งาน</h1>
=======
      <NavbarPage />
      <h1 className="h1-linkruleshow">Agree to terms and conditions</h1>
>>>>>>> b8164355389d358d0a4a1df7e6033a8b9b827ea9
      <Rule />
      <Chatbot/>
    </div>
  );
};

export default Linkruleshow;