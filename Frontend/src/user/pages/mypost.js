// import React, { useEffect, useState } from "react";
// import { Dropdown, DropdownButton}  from 'react-bootstrap';
// import { Form, Col, FormControl, Button } from "react-bootstrap";
// import Navbar from "../components/navbar";
// import "./mypost.css";
// const Mypost = () => {
//     const [isActive, setIsActive] = useState(false);
//     const onClick = () => setIsActive(!isActive);

//     const [imagesFile, setImagesFile] = useState([]); //สร้าง State เพื่อเก็บไฟล์ที่อัพโหลด
//     const [imagesProfile, setImagesProfile] = useState("/profile.png"); //สร้าง State เพื่อเก็บรูปโปรไฟล์
//     const [name, setName] = useState();
//     const [surname, setSurname] = useState();
//     const [id, setId] = useState();
//     const [accountnumber, setAccountnumber] = useState();
//     const [nameproduct, setNameproduct] = useState();
//     const [productcategory, setProductcategory] = useState();
//     const [money, setMoney] = useState();
//     const [bank, setBank] = useState();
//     const [datetime, setDatetime] = useState();
//     const [social, setSocial] = useState();
//     const [other, setOther] = useState();
    

//   return (
//       <div>
//     <div className="allpage">
//       <Navbar />
//       <h1>โพสต์ของฉัน</h1>
//         <div className="container-mypost">
//             <div className="cotainer-mypost2">
//                 <div className="profile-img">
//                     <img className="img-circle" src="/img/profile.png" />
//                         <div className="name">
//                             @Nuitychibiko
//                         </div><br/>
//                         <div className="date">
//                             13/11/2563 
//                             <span className="time">23:38 </span>
//                         </div>
//                 </div>

//                 <div className="buttonshared">
//                     <a className="buttonshare"
//                         href="/post/edit">
//                         <i class="fas fa-share"></i>
//                     </a>
//                 </div>

//                 <div className="container-setiing">
//                     <div className="menu-containersetting">
//                         <div onClick={onClick} className="buttonsetting">
//                             <img className="img-setting"
//                                 src="/img/setting.png"
//                                 alt="User avatar">
//                             </img>
//                         </div>
//                         <div
//                             className={`menusetting ${isActive ? "active" : "inactive"}`}>
//                             <ul>
//                                 <li>
//                                     <a href="/post/edit">แก้ไขโพสต์</a>
//                                 </li>
//                                 <li>
//                                     <a href="#">ลบโพสต์</a>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="container-mypost3">
//                     <div className="profile-bad-img">
//                         <img className="img-circle" src="/img/profile.png" />
//                     </div>
//                     <Form className="formsize">
//                         <Form.Row>
//                             <Form.Group
//                                 as={Col}
//                                 className="left col-lg-6 col-12"
//                                 controlId="formGridName"
//                                 >
//                                 <Form.Label>
//                                     ชื่อ (ผู้โกง) <span>xxxxxxxx</span>
//                                 </Form.Label>
//                             </Form.Group>

//                             <Form.Group as={Col} controlId="formGridLastname">
//                                 <Form.Label>
//                                     นามสกุล (ผู้โกง) <span>xxxxxxxx</span>
//                                 </Form.Label>
//                             </Form.Group>
//                         </Form.Row>

//                         <Form.Row>
//                             <Form.Group
//                                 as={Col}
//                                 className="left col-lg-6 col-12"
//                                 controlId="formGridId"
//                                 >
//                                 <Form.Label>
//                                     เลขบัตรประชาชน (ผู้โกง) <span>xxxxxxxx</span>
//                                 </Form.Label>
//                             </Form.Group>

//                             <Form.Group as={Col} controlId="formGridAccountnumber">
//                                 <Form.Label>
//                                     เลขที่บัญชี (ผู้โกง) <span>xxxxxxxx</span>
//                                 </Form.Label>
//                             </Form.Group>
//                         </Form.Row>

//                         <Form.Row>
//                             <Form.Group
//                                 as={Col}
//                                 className="left col-lg-6 col-12"
//                                 controlId="formGridNameproduct"
//                                 >
//                                 <Form.Label>
//                                     ชื่อสินค้า <span>xxxxxxxx</span>
//                                 </Form.Label>
//                             </Form.Group>

//                             <Form.Group as={Col} controlId="formGridCategory">
//                                 <Form.Label>
//                                     หมวดหมู่สินค้า <span>xxxxxxxx</span>
//                                 </Form.Label>
//                             </Form.Group>
//                         </Form.Row>

//                         <Form.Row>
//                             <Form.Group
//                                 as={Col}
//                                 className="left col-lg-6 col-12"
//                                 controlId="formGridPrice"
//                                 >
//                                 <Form.Label>
//                                     จำนวนเงิน (บาท) <span>xxxxxxxx</span>
//                                 </Form.Label>
//                             </Form.Group>

//                             <Form.Group as={Col} controlId="formGridCategory">
//                                 <Form.Label>
//                                     ธนาคาร <span>xxxxxxxx</span>
//                                 </Form.Label>
//                             </Form.Group>
//                         </Form.Row>

//                         <Form.Row>
//                             <Form.Group
//                                 as={Col}
//                                 className="left col-lg-6 col-12"
//                                 controlId="formGridDate"
//                                 >
//                                 <Form.Label>
//                                     วันที่โดนโกง <span>xxxxxxxx</span>
//                                 </Form.Label>
//                             </Form.Group>

//                             <Form.Group as={Col} controlId="formGridSocial">
//                                 <Form.Label>
//                                     ช่องทางที่โดนโกง <span>xxxxxxxx</span>
//                                 </Form.Label>
//                             </Form.Group>
//                         </Form.Row>

//                         <Form.Group controlId="exampleForm.ControlTextarea1">
//                             <Form.Label>
//                                 รายละเอียดเพิ่มเติม <span>xxxxxxxx</span>
//                             </Form.Label>
//                         </Form.Group>
//                         <div className="img-holder-bad">
//                             <img className="img-bad"src="/img/nui.jpg" />
//                             <img className="img-bad"src="/img/nui.jpg" />
//                             <img className="img-bad"src="/img/nui.jpg" />
//                         </div>
//         </div>
//         </div>
//   );
// };

// export default Mypost;
