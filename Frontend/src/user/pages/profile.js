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

  // ฟังกชันการ Signup
  const SignupSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    axios
      .post("http://localhost:7000/user/signup", {
        username: username,
        firstname: firstname,
        surname: surname,
        sex: sex,
        date: date,
        phone: phone,
        province: province,
        email: email,
        password: password,
      })
      .then((result) => {
        console.log("signup success", result);
        auth
          .signInWithEmailAndPassword(email, password)
          .then((result) => {
            console.log(result);
            history.push("/");
          })
          .catch((err) => {
            console.log(err);
          });
        history.push("/");
      })
      .catch((err) => {
        setEmailis_inVaild(true);
      });
  };

  // ฟังกชันการ Login ผ่าน Google

  const googleLogin = async (e) => {
    e.preventDefault();
    const result = await auth.signInWithPopup(googleProvider);
    console.log(result);
    axios
      .post("http://localhost:7000/user/googlesignup", { result: result })
      .then((result) => {
        console.log(result.data);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ฟังกชันการ Login ผ่าน Facebook

  const facebookLogin = async (e) => {
    e.preventDefault();
    const result = await auth.signInWithPopup(facebookProvider);
    console.log(result);
    axios
      .post("http://localhost:7000/user/facebooksignup", { result: result })
      .then((result) => {
        console.log(result.data);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ฟังกชันการเลือกเพศใน input

  const selectSex = (e) => {
    if (e.target.value === "male") {
      setSex(e.target.value);
    } else setSex(e.target.value);
  };

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
    name: Yup.string()
      .min(2, "สั้นเกินไป")
      .max(50, "ยาวเกินไป")
      .required("จำเป็นต้องกรอกช่องนี้")
      .test("", "กรุณาใส่ตัวอักษรเท่านั้น", (value) => {
        return !/^[0-9]+$/.test(value);
      }),
    lastname: Yup.string()
      .min(2, "สั้นเกินไป")
      .max(50, "ยาวเกินไป")
      .required("จำเป็นต้องกรอกช่องนี้")
      .test("", "กรุณาใส่ตัวอักษรเท่านั้น", (value) => {
        return !/^[0-9]+$/.test(value);
      }),
    username: Yup.string()
      .min(2, "สั้นเกินไป")
      .max(50, "ยาวเกินไป")
      .required("จำเป็นต้องกรอกช่องนี้"),
    phone: Yup.number()
      .max(10000000000, "ยาวเกินไป")
      .required("จำเป็นต้องกรอกช่องนี้")
      .typeError("กรุณาใส่ตัวเลขเท่านั้น"),
    email: Yup.string()
      .email("รูปแบบอีเมลไม่ถูกต้อง")
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
          {/* <img src="/img/logoLogin.png" className="Logo-signup" /> */}
          <p className="h2 text-center mb-2 font-weight-bold text1-signup">
            ข้อมูลส่วนตัว
          </p>
          {emailis_inVaild ? (
            <div className="alert-signup">
              {" "}
              <span>อีเมลนี้มีอยู่ในระบบแล้ว</span>
            </div>
          ) : (
            <p></p>
          )}
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
                    <label htmlFor="name" style={styles.txt2}>
                      Username
                    </label>
                    <Field
                      name="username"
                      type="text"
                      className={`form-control ${
                        touched.username
                          ? errors.username
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      id="username"
                      placeholder="Username"
                      onKeyUp={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      component="div"
                      name="username"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group mb-1">
                    <label htmlFor="email" style={styles.txt2}>
                      Email
                    </label>
                    <Field
                      name="email"
                      type="email"
                      className={`form-control ${
                        touched.email
                          ? errors.email
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      id="email"
                      placeholder="Email"
                      onKeyUp={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      component="div"
                      name="email"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group mb-1">
                    <label htmlFor="password" style={styles.txt2}>
                      Password
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
                      placeholder="Password"
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
                      Confirm Password
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
                      placeholder="Confirm Password"
                    />
                    <ErrorMessage
                      component="div"
                      name="confirmPassword"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group mb-1">
                    <label htmlFor="name" style={styles.txt2}>
                      ชื่อจริง
                    </label>
                    <Field
                      name="name"
                      type="text"
                      className={`form-control ${
                        touched.name
                          ? errors.name
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      id="name"
                      placeholder="ชื่อจริง"
                      onKeyUp={(e) => {
                        setFirstname(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      component="div"
                      name="name"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label htmlFor="lastname" style={styles.txt2}>
                      นามสกุลจริง
                    </label>
                    <Field
                      name="lastname"
                      type="text"
                      className={`form-control ${
                        touched.lastname
                          ? errors.lastname
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      id="lastname"
                      placeholder="นามสกุล"
                      onKeyUp={(e) => {
                        setSurname(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      component="div"
                      name="lastname"
                      className="invalid-feedback"
                    />
                  </div>

                  <div
                    className="form-group mb-0 gender"
                    style={{ color: "#6C757D" }}
                  >
                    <label className="label-form-title">เพศ</label>
                    <div className="form-inside">
                      <div className="profile-data d-inline mr-2">
                        <input
                          required
                          onChange={selectSex}
                          name="gender"
                          type="radio"
                          id="male"
                          value="male"
                          className="mr-1"
                        />
                        <label htmlFor="male">ชาย</label>
                      </div>
                      <div className="profile-data d-inline">
                        <input
                          required
                          onChange={selectSex}
                          name="gender"
                          type="radio"
                          id="female"
                          value="female"
                          className="mr-1"
                        />
                        <label htmlFor="female">หญิง</label>
                      </div>
                    </div>
                  </div>

                  <div className="form-group mb-4 ">
                    <label htmlFor="phone" style={styles.txt2}>
                      เบอร์โทรศัพท์
                    </label>
                    <Field
                      name="phone"
                      type="tel"
                      className={`form-control ${
                        touched.phone
                          ? errors.phone
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      id="phone"
                      placeholder="เบอร์โทรศัพท์"
                      onKeyUp={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      component="div"
                      name="phone"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="Province mb-5" style={{ color: "#6C757D" }}>
                    <label for="province" className="label-form-title">
                      จังหวัด
                    </label>
                    <div className="form-inside">
                      <Field
                        as="select"
                        name="color"
                        className="province-select"
                        onChange={(e) => {
                          setProvince(e.target.value);
                        }}
                      >
                        <option value="" selected>
                          กรุณาเลือกจังหวัด
                        </option>
                        <option value="กรุงเทพมหานคร">กรุงเทพมหานคร</option>
                        <option value="กระบี่">กระบี่ </option>
                        <option value="กาญจนบุรี">กาญจนบุรี </option>
                        <option value="กาฬสินธุ์">กาฬสินธุ์ </option>
                        <option value="กำแพงเพชร">กำแพงเพชร </option>
                        <option value="ขอนแก่น">ขอนแก่น</option>
                        <option value="จันทบุรี">จันทบุรี</option>
                        <option value="ฉะเชิงเทรา">ฉะเชิงเทรา </option>
                        <option value="ชัยนาท">ชัยนาท </option>
                        <option value="ชัยภูมิ">ชัยภูมิ </option>
                        <option value="ชุมพร">ชุมพร </option>
                        <option value="ชลบุรี">ชลบุรี </option>
                        <option value="เชียงใหม่">เชียงใหม่ </option>
                        <option value="เชียงราย">เชียงราย </option>
                        <option value="ตรัง">ตรัง </option>
                        <option value="ตราด">ตราด </option>
                        <option value="ตาก">ตาก </option>
                        <option value="นครนายก">นครนายก </option>
                        <option value="นครปฐม">นครปฐม </option>
                        <option value="นครพนม">นครพนม </option>
                        <option value="นครราชสีมา">นครราชสีมา </option>
                        <option value="นครศรีธรรมราช">นครศรีธรรมราช </option>
                        <option value="นครสวรรค์">นครสวรรค์ </option>
                        <option value="นราธิวาส">นราธิวาส </option>
                        <option value="น่าน">น่าน </option>
                        <option value="นนทบุรี">นนทบุรี </option>
                        <option value="บึงกาฬ">บึงกาฬ</option>
                        <option value="บุรีรัมย์">บุรีรัมย์</option>
                        <option value="ประจวบคีรีขันธ์">
                          ประจวบคีรีขันธ์{" "}
                        </option>
                        <option value="ปทุมธานี">ปทุมธานี </option>
                        <option value="ปราจีนบุรี">ปราจีนบุรี </option>
                        <option value="ปัตตานี">ปัตตานี </option>
                        <option value="พะเยา">พะเยา </option>
                        <option value="พระนครศรีอยุธยา">
                          พระนครศรีอยุธยา{" "}
                        </option>
                        <option value="พังงา">พังงา </option>
                        <option value="พิจิตร">พิจิตร </option>
                        <option value="พิษณุโลก">พิษณุโลก </option>
                        <option value="เพชรบุรี">เพชรบุรี </option>
                        <option value="เพชรบูรณ์">เพชรบูรณ์ </option>
                        <option value="แพร่">แพร่ </option>
                        <option value="พัทลุง">พัทลุง </option>
                        <option value="ภูเก็ต">ภูเก็ต </option>
                        <option value="มหาสารคาม">มหาสารคาม </option>
                        <option value="มุกดาหาร">มุกดาหาร </option>
                        <option value="แม่ฮ่องสอน">แม่ฮ่องสอน </option>
                        <option value="ยโสธร">ยโสธร </option>
                        <option value="ยะลา">ยะลา </option>
                        <option value="ร้อยเอ็ด">ร้อยเอ็ด </option>
                        <option value="ระนอง">ระนอง </option>
                        <option value="ระยอง">ระยอง </option>
                        <option value="ราชบุรี">ราชบุรี</option>
                        <option value="ลพบุรี">ลพบุรี </option>
                        <option value="ลำปาง">ลำปาง </option>
                        <option value="ลำพูน">ลำพูน </option>
                        <option value="เลย">เลย </option>
                        <option value="ศรีสะเกษ">ศรีสะเกษ</option>
                        <option value="สกลนคร">สกลนคร</option>
                        <option value="สงขลา">สงขลา </option>
                        <option value="สมุทรสาคร">สมุทรสาคร </option>
                        <option value="สมุทรปราการ">สมุทรปราการ </option>
                        <option value="สมุทรสงคราม">สมุทรสงคราม </option>
                        <option value="สระแก้ว">สระแก้ว </option>
                        <option value="สระบุรี">สระบุรี </option>
                        <option value="สิงห์บุรี">สิงห์บุรี </option>
                        <option value="สุโขทัย">สุโขทัย </option>
                        <option value="สุพรรณบุรี">สุพรรณบุรี </option>
                        <option value="สุราษฎร์ธานี">สุราษฎร์ธานี </option>
                        <option value="สุรินทร์">สุรินทร์ </option>
                        <option value="สตูล">สตูล </option>
                        <option value="หนองคาย">หนองคาย </option>
                        <option value="หนองบัวลำภู">หนองบัวลำภู </option>
                        <option value="อำนาจเจริญ">อำนาจเจริญ </option>
                        <option value="อุดรธานี">อุดรธานี </option>
                        <option value="อุตรดิตถ์">อุตรดิตถ์ </option>
                        <option value="อุทัยธานี">อุทัยธานี </option>
                        <option value="อุบลราชธานี">อุบลราชธานี</option>
                        <option value="อ่างทอง">อ่างทอง </option>
                      </Field>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>

            <button onClick={facebookLogin} className="btn-block LoginFacebook">
              <div>
                <i class="fas fa-user-edit"></i>
              </div>
              <p className="mx-auto my-1">แก้ไขข้อมูลส่วนตัว</p>
            </button>

            <button onClick={googleLogin} className="btn-block LoginGoogle">
              <img 
                src="/img/change_password.png" 
                width="30px"
                height="26px"
                fill="#FFFFFF"
                viewBox="0 0 50 50"
                />
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


