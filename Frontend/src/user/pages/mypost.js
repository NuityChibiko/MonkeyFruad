import React, { useEffect, useState,useContext } from "react";
import { Dropdown, DropdownButton}  from 'react-bootstrap';
import { Form, Col, FormControl, Button } from "react-bootstrap";
import {
    auth,
    googleProvider,
    facebookProvider,
    firestore
  } from "../Frontfirebase";
import Navbar from "../components/navbar";
import "./mypost.css";
import Axios from "axios"
import usercontext from "../context/usercontext"
const Mypost = () => {
    const [isActive, setIsActive] = useState(false);
    const onClick = () => setIsActive(!isActive);

    const [imagesFile, setImagesFile] = useState([]); //สร้าง State เพื่อเก็บไฟล์ที่อัพโหลด
    const [imagesProfile, setImagesProfile] = useState("/img/profile.png"); //สร้าง State เพื่อเก็บรูปโปรไฟล์
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [id, setId] = useState();
    const [accountnumber, setAccountnumber] = useState();
    const [nameproduct, setNameproduct] = useState();
    const [productcategory, setProductcategory] = useState();
    const [money, setMoney] = useState();
    const [bank, setBank] = useState();
    const [datetime, setDatetime] = useState();
    const [social, setSocial] = useState();
    const [other, setOther] = useState();
    const [mypost,   Setmypost] = useState();
    const [new2,   Setnew2] = useState();
    let { user , setUser} = useContext(usercontext)

    const ImageHoverZoom = ({ imagePreviewUrl }) => {
     
    }
    console.log(user)

   
    // const ok =async () =>{
   
    //    {
    //     let ok = await Axios.post(`http://localhost:7000/user/session`)
    //     let mydata = ok.data.id
        
    //     console.log(mydata)
    //     }
        
    //     const showdata =await firestore.collection("Post").where("useruid" , "==" , mydata).onSnapshot((querySnapshot) =>{
        
    //     let item = []
    //     querySnapshot.forEach((doc) =>{
          
    //       item.push(doc.data())
    //       console.log(item)
    //     })
    //     Setmypost(item)
    //   })
    
    // }


    const ok =async () =>{
    
        let ok = await Axios.get(`http://localhost:7000/user/session`)
        console.log(ok.data.item)
        Setmypost(ok.data.item)
        
    //     const showdata =await firestore.collection("Post").onSnapshot((querySnapshot) =>{
        
    //     let item = []
    //     querySnapshot.forEach((doc) =>{
          
    //       item.push(doc.data())
    //       console.log(item)
    //     })
    //     Setmypost(item)
    //   })
    
    }


    useEffect(() => {
      ok()
  }, [])
  
    

  return (
    <div className="allpage">
      <Navbar />
        <h1 className="h1-mypost">โพสต์ของฉัน</h1>
      {mypost ? mypost.map(ok =>{
          return (
              <div>
                       
        <div className="container-mypost">
            <div className="cotainer-mypost2">
                <div className="mypost-profile-img">
                    <img className="img-circle" src="/img/profile.png" />
                        <div className="mypost-name">
                            @Nuitychibiko
                        </div><br/>
                        <div className="mypost-date">
                            13/11/2563 
                            <span className="mypost-time">23:38 </span>
                        </div>
                </div>

                <div className="mypostbuttonshared">
                    <a className="mypostbuttonshare"
                        href="/post/edit">
                        <i class="fas fa-share"></i>
                    </a>
                </div>

                <div className="container-mypostsetiing">
                    <div className="menu-containermypostsetting">
                        <div onClick={onClick} className="mypostbuttonsetting">
                            <img className="mypostimg-setting"
                                src="/img/setting.png"
                                alt="avatar">
                            </img>
                        </div>
                        <div
                            className={`mypostmenusetting ${isActive ? "active" : "inactive"}`}>
                            <ul className="ul-mypostmenusetting">
                                <li className="li-mypostmenusetting">
                                    <a className="a-mypostmenusetting" href="/post/edit">แก้ไขโพสต์</a>
                                </li>
                                <li className="li-mypostmenusetting">
                                    <a className="a-mypostmenusetting" href="#">ลบโพสต์</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="container-mypost3">
                    <div className="mypostprofile-bad-img">
                        <img className="img-circle" src="/img/profile.png" />
                    </div>
                    <Form className="formsize-mypost">
                        <Form.Row>
                            <Form.Group
                                as={Col}
                                className="mypost-left col-lg-6 col-12"
                                controlId="formGridName"
                                >
                                <Form.Label>
                                    ชื่อ (ผู้โกง) <span className="spanmypost">{ok.name}</span>
                                </Form.Label>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLastname">
                                <Form.Label>
                                    นามสกุล (ผู้โกง) <span className="spanmypost">{ok.surname}</span>
                                </Form.Label>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group
                                as={Col}
                                className="mypost-left col-lg-6 col-12"
                                controlId="formGridId"
                                >
                                <Form.Label>
                                    เลขบัตรประชาชน (ผู้โกง) <span className="spanmypost">{ok.id}</span>
                                </Form.Label>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridAccountnumber">
                                <Form.Label>
                                    เลขที่บัญชี (ผู้โกง) <span className="spanmypost">{ok.accountnumber}</span>
                                </Form.Label>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group
                                as={Col}
                                className="mypost-left col-lg-6 col-12"
                                controlId="formGridNameproduct"
                                >
                                <Form.Label>
                                    ชื่อสินค้า <span className="spanmypost">{ok.nameproduct}</span>
                                </Form.Label>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCategory">
                                <Form.Label>
                                    หมวดหมู่สินค้า <span className="spanmypost">{ok.productcategory}</span>
                                </Form.Label>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group
                                as={Col}
                                className="mypost-left col-lg-6 col-12"
                                controlId="formGridPrice"
                                >
                                <Form.Label>
                                    จำนวนเงิน (บาท) <span className="spanmypost">{ok.money}</span>
                                </Form.Label>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCategory">
                                <Form.Label>
                                    ธนาคาร <span className="spanmypost">{ok.bank}</span>
                                </Form.Label>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group
                                as={Col}
                                className="mypost-leftcol-lg-6 col-12"
                                controlId="formGridDate"
                                >
                                <Form.Label>
                                    วันที่โดนโกง <span className="spanmypost">{ok.datetime}</span>
                                </Form.Label>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridSocial">
                                <Form.Label>
                                    ช่องทางที่โดนโกง <span className="spanmypost">{ok.social}</span>
                                </Form.Label>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>
                                รายละเอียดเพิ่มเติม <span className="spanmypost">{ok.other}</span>
                            </Form.Label>
                        </Form.Group>
                        <div className="img-holder-badslip">
                        <img
                            className="img-bad"
                            alt=""
                            src="/img/nui.jpg"
                            style={{ overflow: "hidden" }}
                            onMouseOver={(e) => (e.currentTarget.style = { transform: "scale(1.25)", overflow: "hidden" })}
                            onMouseOut={(e) => (e.currentTarget.style = { transform: "scale(1)", overflow: "hidden" })}
                        />
                        <img
                            className="img-bad"
                            alt=""
                            src="/img/nui.jpg"
                            style={{ overflow: "hidden" }}
                            onMouseOver={(e) => (e.currentTarget.style = { transform: "scale(1.25)", overflow: "hidden" })}
                            onMouseOut={(e) => (e.currentTarget.style = { transform: "scale(1)", overflow: "hidden" })}
                        />
                        <img
                            className="img-bad"
                            alt=""
                            src="/img/nui.jpg"
                            style={{ overflow: "hidden" }}
                            onMouseOver={(e) => (e.currentTarget.style = { transform: "scale(1.25)", overflow: "hidden" })}
                            onMouseOut={(e) => (e.currentTarget.style = { transform: "scale(1)", overflow: "hidden" })}
                        />
                        </div>
                    </Form>
                </div>
            </div>
        </div>
        <div className="container-mypost4">
            <div className="mypost-comment-img1">
                <img className="img-circle1" src="/img/profile.png" />
                <div className="mypost-comment-name1">
                    @Nuitychibiko <span className="mypost-comment-time1"> 40 นาที </span>
                </div><br/>
                <div className="mypost-comment-comments1">
                    ไอนี้อีกแล้วหรอ น่าโดนจริงๆ อย่าให้เจอตัวบอกก่อน 
                </div>
            </div>
            <div className="mypost-comment-img2">
                <img className="img-circle2" src="/img/profile.png" />
                <div className="mypost-comment-name2">
                    @Nuitychibiko <span className="mypost-comment-time2"> 40 นาที </span>
                </div><br/>
                <div className="mypost-comment-comments2">
                    โดนโกงไป5000 เจ็บใจจริงๆ TT ถ้าเจอจะซัดหน้าให้หมอบ 
                </div>
            </div>
            <div className="mypost-comment-img3">
                <img className="img-circle3" src="/img/profile.png" />
                <div className="mypost-comment-name3">
                    @Nuitychibiko <span className="mypost-comment-time3"> 40 นาที </span>
                </div><br/>
                <div className="mypost-comment-comments3">
                    <Form.Row>
                        <Form.Group className="mypost-writecommemt col-lg-6 col-12" controlId="exampleForm.ControlTextarea1">
                            <Form.Control placeholder="เขียนความคิดเห็น..." />
                        </Form.Group>

                        <Form.Group className="mypost-writecommemt col-lg-6 col-12" controlId="exampleForm.ControlTextarea1">
                        <div className="mypostbuttonsend">
                            <a className="mypostbuttonsends"
                                href="">
                                <i class="fas fa-paper-plane"></i>
                            </a>  
                        </div>
                        </Form.Group>
                    </Form.Row>
                </div>
            </div>
        </div>
              </div>
          )
      }) : null}
    
    </div>
  );
};

export default Mypost;