import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./profile.css";
import Chatbot from "../components/chatbot";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { auth, googleProvider, facebookProvider } from "../Frontfirebase";
import NavbarPage from "../components/navnew";

const Profile = () => {
  let history = useHistory();

  // ที่เก็บ state
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [sex, setSex] = useState("");
  const [date, setDate] = useState();
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailis_inVaild, setEmailis_inVaild] = useState(false);


  return (
    <div>
      <NavbarPage />
      <div className="container-signup">
        <form className="LoginForm">
          <p className="h2 text-center mb-2 font-weight-bold text1-signup">ข้อมูลส่วนตัว</p>

          <div className="profile-badformpost-img">
            <img src='/img/profile.png' className="img-circle"/>
          </div> 

          <div className="form-group my-0">
            <label className="label-form-title-profile">Username</label>
            <div className="form-inside-profile">
                <p>NuityChibiko</p>
            </div>
          </div>

          <div className="form-group my-0">
            <label className="label-form-title-profile">ชื่อจริง</label>
            <div className="form-inside-profile">
                <p>บวรศักดิ์</p>
            </div>
          </div>

          <div className="form-group my-0">
            <label className="label-form-title-profile">นามสกุล</label>
            <div className="form-inside-profile">
                <p>เหลือจันทร์</p>
            </div>
          </div>

          <div className="form-group my-0">
            <label className="label-form-title-profile">เพศ</label>
            <div className="form-inside-profile">
                <p>ชาย</p>
            </div>
          </div>

          <div className="form-group my-0">
            <label className="label-form-title-profile">วันเกิด</label>
            <div className="form-inside-profile">
                <p><span>09</span> / <span>02</span> / <span>2000</span></p>
            </div>
          </div>

          <div className="form-group my-0">
            <label className="label-form-title-profile">เบอร์โทรศัพท์</label>
            <div className="form-inside-profile">
                <p>0930239802</p>
            </div>
          </div>

          <div className="form-group my-0">
            <label className="label-form-title-profile">จังหวัด</label>
            <div className="form-inside-profile">
                <p>กรุงเทพมหานคร</p>
            </div>
          </div>

          <div className="col-md-12 mt-2">
            <button className="btn-block LoginFacebook">
              <div>
                <i class="fas fa-user-edit"></i>
              </div>
              <p className="mx-auto my-1">แก้ไขข้อมูลส่วนตัว</p>
            </button>
            <button className="btn-block LoginGoogle">
              <div>
                <i class="fas fa-unlock"></i>
              </div>
              <p className="mx-auto my-1">เปลี่ยนรหัสผ่าน</p>
            </button>
          </div>

        </form>
      </div>
      <Chatbot />
    </div>
  );
};

export default Profile;


