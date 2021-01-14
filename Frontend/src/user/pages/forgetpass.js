import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../components/navbar";
import "./forgetpass.css";
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


const Forgetpass = () => {
  const [email, setEmail] = useState("");

  const ForgetEmailSubmit = (e) => {
    e.preventDefault()
    auth.sendPasswordResetEmail(email).then(function(result) {
      console.log(result)
    }).catch(function(error) {
      console.log(error)
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



  return (
    <div>
      <Navbar />
      <div className="container-login">
        <form className="LoginForm">
          <img src="/img/logoLogin.png" className="LogoLogin" />
          <p className="h2 text-center mb-4 font-weight-bold">Reset password</p>
          <p className="text-left my-0 instruction-forgetpass">
            Enter the email associated with your account and we'll send you an email with instructions to reset your password.
          </p>
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
                          <div className="form-group mb-4">
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
                          </Form>
                  )}
              </Formik>
          </div>

          <button onClick={ForgetEmailSubmit} className="btn-block LoginButton">
            <p className="mx-auto my-1">Send Instructions</p>
          </button>

        </form>
      </div>
      <Chatbot/>
    </div>
  );
};

export default Forgetpass;
