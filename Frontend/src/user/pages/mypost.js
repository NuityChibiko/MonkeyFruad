import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import "./mypost.css";
const Mypost = () => {

  return (
    <div className="allpage">
      <Navbar />
      <h1>โพสต์ของฉัน</h1>
        <div className="container-mypost">
            <div className="cotainer-mypost2">
                <div className="profile-img">
                    <img className="img-circle" src="/profile.png" />
                    <div className="settingpost">
                        <i class="fas fa-ellipsis-v"></i>
                    </div>
                    <div className="name">
                        @Nuitychibiko
                    </div><br/>
                    <div className="date">
                        13/11/2563 
                        <span className="time">23:38 </span>
                    </div>
                </div>
                <div className="profile-bad-img">
                    <img className="img-circle" src="/profile.png" />
                </div>
            </div>
        </div>
    </div>
  );
};

export default Mypost;
