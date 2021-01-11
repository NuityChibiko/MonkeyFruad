import React, { useEffect, useState,useContext  } from "react";
import {Link ,useParams} from "react-router-dom"
import { Dropdown, DropdownButton}  from 'react-bootstrap';
import { Form, Col, FormControl, Button } from "react-bootstrap";
import {
    auth,
    googleProvider,
    facebookProvider,
    firestore
  } from "../Frontfirebase";
  import Axios from "axios"
import Navbar from "../components/navbar";
import "./mypost.css";
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
    const [data,   Setdata] = useState();
    let { user , setUser} = useContext(usercontext)
 
    let { uid } = useParams()

    const ImageHoverZoom = ({ imagePreviewUrl }) => {
     
    }
   

    const deleted = async(uid) =>{
        const postdelete = await Axios.post(`http://localhost:7000/post/delete/${uid}`)
        console.log(postdelete.data)
        const ok = await Axios.post("http://localhost:7000/user/session", {result:user})
        console.log(ok.data.item)
        Setmypost(ok.data.item) 
      }
       
  

  
  
const ok = async () =>{
    try{
        const ok = await Axios.get(`http://localhost:7000/post/mypost/${uid}`)
        
        console.log(ok.data.item)
        Setmypost(ok.data.item)
    }catch(err){
        console.log("error")
    }
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
                            {ok.date}
                            {/* <span className="mypost-time">23:38 </span> */}
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
                                <a className="a-mypostmenusetting"><Link to={`/post/edit/${ok.uid}`}>แก้ไขโพสต์</Link></a>
                                  
                                </li>
                                <li className="li-mypostmenusetting">
                                <a className="a-mypostmenusetting" onClick={() =>  deleted(ok.uid)}> ลบโพสต์ </a> 
                                
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

//   return (
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
//                                 src="/setting.png"
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
//                             <img className="img-bad"src="/img//nui.jpg" />
//                             <img className="img-bad"src="/img//nui.jpg" />
//                             <img className="img-bad"src="/img//nui.jpg" />
//                         </div>
//                     </Form>
//                 </div>
//             </div>
//         </div>
//     </div>
//   );
// };

// export default Mypost;
export default Mypost;
