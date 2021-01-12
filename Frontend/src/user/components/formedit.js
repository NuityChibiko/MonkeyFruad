import React, { useEffect, useState, Component } from "react";
import { Form, Col, FormControl, Button } from "react-bootstrap";
import {useParams } from "react-router-dom"
import {
  auth,
  googleProvider,
  facebookProvider,
  firestore
} from "../Frontfirebase";
import "bootstrap/dist/css/bootstrap.min.css";
import "./formpost.css";
import Axios from "axios"
const Formedit = () => {

  // เก็บ State ทุก Input เพื่อส่งไปหลังบ้าน
  const [show, Setshow] = useState();
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
  const [other, setOther] = useState("");



  const { uid } = useParams()
  // ฟังก์ชันเปลี่ยนรูปโปร
  const ProfileChange = (event) => {  
  
    event.preventDefault(); // ใส่ไว้ไม่ให้ refresh หน้าเว็บ
    let files = event.target.files; //ใช้เพื่อแสดงไฟลทั้งหมดที่กดเลือกไฟล
    let reader = new FileReader(); //ใช้ Class  FileReader เป็นตัวอ่านไฟล์
    reader.readAsDataURL(files[0]); //เป็นคำสั่งสำหรับการแปลง url มาเป็น file
    reader.onload = (event) => {
      setImagesProfile(event.target.result); // ใส่ข้อมูลเข้าไปยัง state ผาน setImagesProfile
    };

  };

// ฟังก์ชันอัพโหลดไฟล์ 
  const FileUpload = (event) => { 
   
    setImagesFile([]); // reset state รูป เพื่อกันในกรณีที่กดเลือกไฟล์ซ้ำแล้วรูปต่อกันจากอันเดิม
    event.preventDefault(); // ใส่ไว้ไม่ให้ refresh หน้าเว็บ
    let files = event.target.files; //ใช้เพื่อแสดงไฟลทั้งหมดที่กดเลือกไฟล

    //ทำการวนข้อมูลภายใน Array
    for (var i = 0; i < files.length; i++) {
      let reader = new FileReader(); //ใช้ Class  FileReader เป็นตัวอ่านไฟล์
      reader.readAsDataURL(files[i]); //เป็นคำสั่งสำหรับการแปลง url มาเป็น file
      reader.onload = (event) => {
        // ใส่ข้อมูลเข้าไปยัง state ผาน  setimagesPreviewUrls
        setImagesFile((prevState) => [...prevState, event.target.result]);
        //  PrevState เป็น Parameter ในการเรียก State ก่อนหน้ามาแล้วรวม Array กับ fileที่อัพโหลดเข้ามา
      };
    }
  };

  const ok = async () =>{
  
    const hello = await Axios.get(`http://localhost:7000/post/edit/${uid}`)
    
    let gethistory = hello.data.item
 
    Setshow(gethistory)
    setName(gethistory[0].name)
    setSurname(gethistory[0].surname)
    setId(gethistory[0].id)
    setAccountnumber(gethistory[0].accountnumber)
    setNameproduct(gethistory[0].nameproduct)
    setProductcategory(gethistory[0].productcategory)
    setMoney(gethistory[0].money)
    setBank(gethistory[0].bank)
    setDatetime(gethistory[0].datetime)
    setSocial(gethistory[0].social)
    setOther(gethistory[0].other)
  }


  useEffect(() => {
    ok()
}, [])


  const handlesubmit = async (e) =>{
    try{
      e.preventDefault()
     
      let sentdata = {imagesFile,imagesProfile,name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other}
      let data = await Axios.post(`http://localhost:7000/post/edit/${uid}`,sentdata)
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className="container-formpost">
      <div className="container-formpost1">
        <div className="profile-badformpost-img">
          <img className="img-circle" src={imagesProfile} />
          <div className="rank-label-container">
            <span className="label label-default rank-label">
              <div className="formpost-ImageUpload">
                <label htmlFor="FileInput">
                  <div className="fileinput">
                    <img className="uploadiconprofile" src="/img/edit.png" />
                  </div>
                </label>
                <div className="buttoninputprofile">
                  <input
                    className="uploadinputprofile"
                    id="FileInput"
                    type="file"
                    onChange={ProfileChange}
                    multiple
                  />
                </div>
              </div>
            </span>
          </div>
        </div>
        <Form className="formsize-formpost" onSubmit={handlesubmit}>
          <Form.Row>
            <Form.Group
              as={Col}
              className="formpost-left col-lg-6 col-12"
              controlId="formGridName"
            >
              <Form.Label>
                ชื่อ (ผู้โกง)<span className="spanformpost">*</span>
              </Form.Label>

              {show ? <Form.Control type="text" placeholder="" value={name} onChange={(event)=>{setName(event.target.value)}} required /> : null }
              {/* <Form.Control type="name" placeholder=""  onChange={(event)=>{setName(event.target.value)}} required />} */}
              </Form.Group>

            <Form.Group as={Col} controlId="formGridLastname">
              <Form.Label>
                นามสกุล (ผู้โกง)<span className="spanformpost">*</span>
              </Form.Label>
              {show ? <Form.Control type="name" placeholder="" value={surname} onChange={(event)=>{setSurname(event.target.value)}} required /> : null}
              {/* <Form.Control type="name" placeholder=""  onChange={(event)=>{setSurname(event.target.value)}} required />} */}
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group
              as={Col}
              className="formpost-left col-lg-6 col-12"
              controlId="formGridId"
            >
              <Form.Label>
                เลขบัตรประชาชน (ผู้โกง)<span className="spanformpost">*</span>
              </Form.Label>
              {show ? <Form.Control type="name" placeholder="" value={id} onChange={(event)=>{setId(event.target.value)}} required /> : null}
              {/* <Form.Control type="name" placeholder=""  onChange={(event)=>{setId(event.target.value)}} required />} */}
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAccountnumber">
              <Form.Label>
                เลขที่บัญชี (ผู้โกง)<span className="spanformpost">*</span>
              </Form.Label>
              {show ? <Form.Control type="name" placeholder="" value={accountnumber} onChange={(event)=>{setAccountnumber(event.target.value)}} required /> : null}
              {/* <Form.Control type="name" placeholder=""  onChange={(event)=>{setAccountnumber(event.target.value)}} required />} */}
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group
              as={Col}
              className="formpost-left col-lg-6 col-12"
              controlId="formGridNameproduct"
            >
              <Form.Label>
                ชื่อสินค้า<span className="spanformpost">*</span>
              </Form.Label>
              {show ? <Form.Control type="name" placeholder="" value={nameproduct} onChange={(event)=>{setNameproduct(event.target.value)}} required /> : null}
              {/* <Form.Control type="name" placeholder=""  onChange={(event)=>{setNameproduct(event.target.value)}} required />} */}
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCategory">
              <Form.Label>
                หมวดหมู่สินค้า<span className="spanformpost">*</span>
              </Form.Label>
              {show ? <Form.Control as="select"    required   value={productcategory} onChange={(event)=>{
                //value={show[0].productcategory}
                setProductcategory(event.target.value)
              }}>
                <option>เลือก...</option>
                <option>แฟชั่น</option>
                <option>ออนไลน์</option>
                </Form.Control> : null}
              {/* // <Form.Control as="select" defaultValue="Choose..."   required  onChange={(event)=>{ */}
              {/* //   setProductcategory(event.target.value)
              // }}>
              //   <option>เลือก...</option>
              //   <option>แฟชั่น</option>
              //   <option>ออนไลน์</option>
              // </Form.Control>} */}
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group
              as={Col}
              className="formpost-left col-lg-6 col-12"
              controlId="formGridPrice"
            >
              <Form.Label>
                จำนวนเงิน (บาท)<span className="spanformpost">*</span>
              </Form.Label>
              {show ? <Form.Control type="name" placeholder="" value={money} onChange={(event)=>{setMoney(event.target.value)}} required /> : null}
              {/* <Form.Control type="name" placeholder=""  onChange={(event)=>{setMoney(event.target.value)}} required />} */}
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCategory">
              <Form.Label>
                ธนาคาร<span className="spanformpost">*</span>
              </Form.Label>
              {show ? <Form.Control as="select"   value={bank} required  onChange={(event)=>{
             
             setBank(event.target.value)
           }}>
                <option>เลือก...</option>
                <option>ธนาคารกรุงเทพ</option>
                <option>ธนาคารกรุงไทย</option>
                <option>ธนาคารกรุงศรีอยุธยา</option>
                <option>ธนาคารกสิกรไทย</option>
                <option>ธนาคารเกียรตินาคิน</option>
                <option>ธนาคารซีไอเอ็มบีไทย</option>
                <option>ธนาคารทหารไทย</option>
                <option>ธนาคารทิสโก้</option>
                <option>ธนาคารไทยพาณิชย์</option>
                <option>ธนาคารธนชาต</option>
                <option>ธนาคารนครหลวงไทย</option>
                <option>ธนาคารยูโอบี</option>
                <option>ธนาคารสแตนดาร์ดชาร์เตอร์ด</option>
                <option>ธนาคารไอซีบีซี</option>
                </Form.Control> : null }
          {/* //     <Form.Control as="select" defaultValue="Choose..."  required  onChange={(event)=>{ */}
             
          {/* //    setBank(event.target.value)
          //  }}>
          //    <option>เลือก...</option>
          //    <option>ธนาคารกรุงเทพ</option>
          //    <option>ธนาคารกรุงไทย</option>
          //    <option>ธนาคารกรุงศรีอยุธยา</option>
          //    <option>ธนาคารกสิกรไทย</option>
          //    <option>ธนาคารเกียรตินาคิน</option>
          //    <option>ธนาคารซีไอเอ็มบีไทย</option>
          //    <option>ธนาคารทหารไทย</option>
          //    <option>ธนาคารทิสโก้</option>
          //    <option>ธนาคารไทยพาณิชย์</option>
          //    <option>ธนาคารธนชาต</option>
          //    <option>ธนาคารนครหลวงไทย</option>
          //    <option>ธนาคารยูโอบี</option>
          //    <option>ธนาคารสแตนดาร์ดชาร์เตอร์ด</option>
          //    <option>ธนาคารไอซีบีซี</option>
          //  </Form.Control>} */}
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group
              as={Col}
              className="formpost-left col-lg-6 col-12"
              controlId="formGridDate"
            >
              <Form.Label>
                วันที่โดนโกง<span className="spanformpost">*</span>
              </Form.Label>
              {show ? <Form.Control type="name" placeholder="" value={datetime} onChange={(event)=>{setDatetime(event.target.value)}} required /> : null }
              {/* <Form.Control type="name" placeholder=""  onChange={(event)=>{setDatetime(event.target.value)}} required />} */}
            </Form.Group>

            <Form.Group as={Col} controlId="formGridSocial">
              <Form.Label>
                ช่องทางที่โดนโกง<span className="spanformpost">*</span>
              </Form.Label>
              {show ? <Form.Control as="select"   value={social} required  onChange={(event)=>{
              
              setSocial(event.target.value)
            }}>
                <option>เลือก...</option>
                <option>Facebook</option>
                <option>Instagram</option>
                <option>Twitter</option>
                <option>Line</option>
                <option>Website</option>
                </Form.Control> : null }
                 {/* <Form.Control as="select" defaultValue="Choose..."  required  onChange={(event)=>{
              
              setSocial(event.target.value)
            }}>
              <option>เลือก...</option>
              <option>Facebook</option>
              <option>Instagram</option>
              <option>Twitter</option>
              <option>Line</option>
              <option>Website</option>
            </Form.Control>} */}
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>รายละเอียดเพิ่มเติม</Form.Label>
            {show ? <Form.Control type="name" placeholder="" value={other} onChange={(event)=>{setOther(event.target.value)}}  /> : null}
            {/* <Form.Control type="name" placeholder=""  onChange={(event)=>{setOther(event.target.value)}} required />} */}
          </Form.Group>         

          <Form.File.Label>
            <span className="spanformpost">
              **กรุณาแนบหลักฐานการโอนเงินและหลักฐานการโดนโกง เช่น ภาพถ่ายหน้าจอ
              (แชท)
            </span>
          </Form.File.Label>

          <input
            className="uploadsformpostuploadslip"
            type="file"
            onChange={FileUpload}
            multiple
          />
          <div className="container-img-holder-imgpreview">
            {imagesFile.map((imagePreviewUrl) => {
              return (
                <img
                  key={imagePreviewUrl}
                  className="imgpreview"
                  alt="previewImg"
                  src={imagePreviewUrl}
                  style={{ overflow: "hidden" }}
                  onMouseOver={(e) => (e.currentTarget.style = { transform: "scale(1.25)", overflow: "hidden" })}
                  onMouseOut={(e) => (e.currentTarget.style = { transform: "scale(1)", overflow: "hidden" })}
                />
              );
            })}
          </div>

          <Form.Row className="linkrule1">
            <Form.Check aria-label="option 1" className="linkrule2"/><a className="linkrule3" href="about.html">ยอมรับข้อตกลง</a>
          </Form.Row>

          <Button className="buttonpost" variant="success" type="submit">
            โพสต์
          </Button>
          {/* <a className="buttonformpost" type="submit" href="/post/mypost">
            โพสต์
          </a> */}
        </Form>
      </div>
    </div>
  );
};

export default Formedit;
