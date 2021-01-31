import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./signup.css";
import Chatbot from "../components/chatbot";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { auth, googleProvider, facebookProvider } from "../Frontfirebase";
import NavbarPage from "../components/navnew";

const Changepass = () => {
  let history = useHistory();

  // ที่เก็บ state
  const [password, setPassword] = useState("");

  // Style มาตรฐานของ Formik
  const styles = {
    row: {
      marginTop: "8rem",
    },
    txt1: {
      fontFamily: "Roboto",
      fontSize: "2.2rem",
      color: "#fff",
      marginBottom: "1rem",
      fontWeight: "700",
      textAlign: "center",
    },
    txt2: {
      fontFamily: "Roboto",
      fontSize: "1rem",
      color: "#fff",
    },
  };

  //object schema สำหรับทำ validation
  const RegisterSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(6, "กรุณากรอกตัวอักษรอย่างน้อย 6 ตัว")
      .max(20, "ยาวเกินไป")
      .required("จำเป็นต้องกรอกช่องนี้"),
    password: Yup.string()
      .min(6, "กรุณากรอกตัวอักษรอย่างน้อย 6 ตัว")
      .max(20, "ยาวเกินไป")
      .required("จำเป็นต้องกรอกช่องนี้"),
    confirmPassword: Yup.string()
      .min(6, "กรุณากรอกตัวอักษรอย่างน้อย 6 ตัว")
      .max(20, "ยาวเกินไป")
      .required("จำเป็นต้องกรอกช่องนี้")
      //check is password match ?
      .test("รหัสผ่านตรงกัน", "รหัสผ่านไม่ตรงกัน", function (value) {
        return this.parent.password === value;
      }),
  });

  return (
    <div>
      <NavbarPage />
      <div className="container-signup">
        <form className="LoginForm">
          <img src="/img/logoLogin.png" className="Logo-signup" />
          <p className="h2 text-center mb-2 font-weight-bold text1-signup">เปลี่ยนรหัสผ่าน</p>

          <div className="col-md-12">
            <Formik
              initialValues={{
                name: "",
                lastname: "",
                email: "",
                password: "",
                confirmPassword: "",
                phone: "",
                username: "",
              }}
              validationSchema={RegisterSchema}
              onSubmit={(values) => {
                // same shape as initial values
                console.log(values);
              }}
            >
              {({ errors, touched }) => (
                <Form>

                  <div className="form-group mb-1">
                    <label htmlFor="oldPassword" style={styles.txt2}>
                      รหัสผ่านปัจจุบัน
                    </label>
                    <Field
                      name="oldPassword"
                      type="password"
                      className={`form-control ${
                        touched.oldpassword
                          ? errors.oldpassword
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      id="oldPassword"
                      placeholder="รหัสผ่านปัจจุบัน"
                      onKeyUp={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      component="div"
                      name="oldPassword"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group mb-1">
                    <label htmlFor="password" style={styles.txt2}>
                      รหัสผ่านใหม่
                    </label>
                    <Field
                      name="password"
                      type="password"
                      className={`form-control ${
                        touched.password
                          ? errors.password
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      id="password"
                      placeholder="รหัสผ่านใหม่"
                      onKeyUp={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      component="div"
                      name="password"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group mb-1">
                    <label htmlFor="confirmPassword" style={styles.txt2}>
                      ยืนยันรหัสผ่านใหม่
                    </label>
                    <Field
                      name="confirmPassword"
                      type="password"
                      className={`form-control ${
                        touched.confirmPassword
                          ? errors.confirmPassword
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      id="confirmPassword"
                      placeholder="ยืนยันรหัสผ่านใหม่"
                    />
                    <ErrorMessage
                      component="div"
                      name="confirmPassword"
                      className="invalid-feedback"
                    />
                  </div>

                </Form>
              )}
            </Formik>

            <button className="btn-block LoginFacebook mt-5">
              <div>
                <i class="fas fa-save pr-1"></i>
              </div>
              <p className="mx-auto my-1">บันทึกข้อมูล</p>
            </button>

          </div>
        </form>
      </div>
      <Chatbot />
    </div>
  );
};

export default Changepass;
