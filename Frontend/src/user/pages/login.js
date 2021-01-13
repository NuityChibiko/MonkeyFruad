import React, { useState} from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../components/navbar";
import "./login.css";
import Chatbot from "../components/chatbot";
// import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage, FastField } from 'formik'
import * as Yup from 'yup'
import {
  auth,
  googleProvider,
  facebookProvider,
} from "../Frontfirebase";
// import { MDBInput } from "mdbreact";
import axios from "axios";
const Login = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailis_inVaild, setEmailis_inVaild] = useState(false);

  const LoginSubmit = (e) => {
    e.preventDefault()
 auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        history.push("/");
      })
      .catch(() => {
        setEmailis_inVaild(true)
      });
  };

  const googleLogin = async (e) => {
    e.preventDefault();
    const result = await auth.signInWithPopup(googleProvider);
    console.log(result)
    axios.post("http://localhost:7000/user/googlesignup", { result: result })
      .then((result) => {
        console.log(result.data);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const facebookLogin = async (e) => {
    e.preventDefault();
    const result = await auth.signInWithPopup(facebookProvider);
    console.log(result)
    axios.post("http://localhost:7000/user/facebooksignup", { result: result })
      .then((result) => {
        console.log(result.data);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const styles = {
    row: {
        marginTop: '8rem'
    },
    txt1: {
        fontFamily: 'Roboto',
        fontSize: '2.2rem',
        color: '#fff',
        marginBottom: '1rem',
        fontWeight: '700',
        textAlign: 'center'
    },
    txt2: {
        fontFamily: 'Roboto',
        fontSize: '1rem',
        color: '#fff'
    }
}

  const RegisterSchema = Yup.object().shape(
    {
      email: Yup.string()
          .email('รูปแบบอีเมลไม่ถูกต้อง')
          .required('จำเป็นต้องกรอกช่องนี้'),
      password: Yup.string()
          .min(6, 'กรุณากรอกตัวอักษรอย่างน้อย 6 ตัว')
          .max(20, 'ยาวเกินไป')
          .required('จำเป็นต้องกรอกช่องนี้')
    }
);
console.log(emailis_inVaild)
  return (
    <div>
      <Navbar />
      <div className="container-login">
        <form className="LoginForm">
          <img src="/img/logoLogin.png" className="LogoLogin" />
          <p className="h2 text-center mb-2 font-weight-bold">เข้าสู่ระบบ</p>
          {emailis_inVaild ? <div>Email นี้ไม่มีอยู่ในระบบ</div>}
          <div className="LoginInputForm">
          <Formik
                  initialValues={{
                      email: '',
                      password: ''
                  }}
                  validationSchema={RegisterSchema}
                  onSubmit={values => {
                      // same shape as initial values
                      console.log(values);
                  }}
              >
                  {({ errors, touched}) => (
                      <Form>
                          <div className="form-group mb-0">
                              <label htmlFor="email" style={styles.txt2}>Email</label>
                              <Field
                                  name="email"
                                  type="email"
                                  className={`form-control ${touched.email ? errors.email ? 'is-invalid' : 'is-valid' : ''}`}
                                  id="email"
                                  placeholder="Email"
                                  onKeyUp={(e)=>{
                                    setEmail(e.target.value)
                                  }}
                              />
                              <ErrorMessage component="div" name="email" className="invalid-feedback" />
                          </div>
                          <div className="form-group mb-4">
                              <label htmlFor="password" style={styles.txt2}>Password</label>
                              <Field
                                  name="password"
                                  type="password"
                                  className={`form-control ${touched.password ? errors.password ? 'is-invalid' : 'is-valid' : ''}`}
                                  id="password"
                                  placeholder="Password"
                                  onKeyUp={(e)=>{
                                    setPassword(e.target.value)
                                  }}
                              />
                              <ErrorMessage component="div" name="password" className="invalid-feedback" />
                          </div>
                          </Form>
                  )}
              </Formik>
          </div>

          <div className="message">
            <div className="RememberCheckbox">
              <input type="checkbox" /> จดจำฉันไว้ในระบบ
            </div>
            <div className="ForgotPassword">
              <a href="./forgetpass">ลืมรหัสผ่าน?</a>
            </div>
          </div>

          <button onClick={LoginSubmit} className="btn-block LoginButton">
            <p className="mx-auto my-1">เข้าสู่ระบบ</p>
          </button>

          <div className="Signup text-center pt-3">
            <span></span>
            <a href="./signup">สมัครสมาชิก</a>
            <hr></hr>
          </div>

          <button onClick={facebookLogin} className="btn-block LoginFacebook">
            <svg
              className="FacebookIcon"
              xmlns="http://www.w3.org/2000/svg"
              width="26px"
              height="26px"
              viewBox="0 0 90 90"
            >
              <g>
                <path
                  d="M90,15.001C90,7.119,82.884,0,75,0H15C7.116,0,0,7.119,0,15.001v59.998   C0,82.881,7.116,90,15.001,90H45V56H34V41h11v-5.844C45,25.077,52.568,16,61.875,16H74v15H61.875C60.548,31,59,32.611,59,35.024V41   h15v15H59v34h16c7.884,0,15-7.119,15-15.001V15.001z"
                  fill="#FFFFFF"
                ></path>
              </g>
            </svg>
            <p className="mx-auto my-1">เข้าสู่ระบบด้วย Facebook</p>
          </button>

          <button onClick={googleLogin} className="btn-block LoginGoogle">
            <svg
              className="GoogleIcon"
              xmlns="http://www.w3.org/2000/svg"
              width="26px"
              height="26px"
              fill="#FFFFFF"
              viewBox="0 0 50 50"
            >
              <g>
                <path d="M 25.996094 48 C 13.3125 48 2.992188 37.683594 2.992188 25 C 2.992188 12.316406 13.3125 2 25.996094 2 C 31.742188 2 37.242188 4.128906 41.488281 7.996094 L 42.261719 8.703125 L 34.675781 16.289063 L 33.972656 15.6875 C 31.746094 13.78125 28.914063 12.730469 25.996094 12.730469 C 19.230469 12.730469 13.722656 18.234375 13.722656 25 C 13.722656 31.765625 19.230469 37.269531 25.996094 37.269531 C 30.875 37.269531 34.730469 34.777344 36.546875 30.53125 L 24.996094 30.53125 L 24.996094 20.175781 L 47.546875 20.207031 L 47.714844 21 C 48.890625 26.582031 47.949219 34.792969 43.183594 40.667969 C 39.238281 45.53125 33.457031 48 25.996094 48 Z "></path>
              </g>
            </svg>
            <p className="mx-auto my-1">เข้าสู่ระบบด้วย Google</p>
          </button>
        </form>
      </div>
      <Chatbot/>
    </div>
  );
};

export default Login;