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
const Formeditpost = () => {

  // เก็บ State ทุก Input เพื่อส่งไปหลังบ้าน
  
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

  const [show, Setshow] = useState();

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
    
    
     const showdata = await firestore.collection("Post").where("uid", "==", uid).onSnapshot((querySnapshot) =>{
       
        let item = []
        querySnapshot.forEach((doc) =>{
          
          item.push(doc.data())
          console.log(item)
        })
        Setshow(item)
      })
    }
  console.log(show)

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
    <div className="container">
      <div className="container2">
        <div className="profile-headers-img">
          <img className="img-circle" src={imagesProfile} />
          <div className="rank-label-container">
            <span className="label label-default rank-label">
              <div class="ImageUpload">
                <label for="FileInput">
                  <div className="fileinput">
                    <img className="uplodeprofile" src="/img/edit.png" />
                  </div>
                </label>
                <div className="buttoninput">
                   <input
                    className="upload"
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
        <Form className="formsize" onSubmit={handlesubmit}>
          <Form.Row>
            <Form.Group
              as={Col}
              className="left col-lg-6 col-12"
              controlId="formGridName"
            >
              <Form.Label>
                ชื่อ (ผู้โกง)<span>*</span>
              </Form.Label>
              
              {show ? <Form.Control type="text" placeholder="" value={show[0].name} onChange={(event)=>{setName(event.target.value)}} required /> : <Form.Control type="name" placeholder=""  onChange={(event)=>{setName(event.target.value)}} required />}
           
           </Form.Group>

            <Form.Group as={Col} controlId="formGridLastname">
              <Form.Label>
                นามสกุล (ผู้โกง)<span>*</span>
              </Form.Label>
              {show ? <Form.Control type="name" placeholder="" value={show[0].surname} onChange={(event)=>{setName(event.target.value)}} required /> : <Form.Control type="name" placeholder=""  onChange={(event)=>{setName(event.target.value)}} required />}
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group
              as={Col}
              className="left col-lg-6 col-12"
              controlId="formGridId"
            >
              <Form.Label>
                เลขบัตรประชาชน (ผู้โกง)<span>*</span>
              </Form.Label>
              {show ? <Form.Control type="name" placeholder="" value={show[0].id} onChange={(event)=>{setName(event.target.value)}} required /> : <Form.Control type="name" placeholder=""  onChange={(event)=>{setName(event.target.value)}} required />}
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAccountnumber">
              <Form.Label>
                เลขที่บัญชี (ผู้โกง)<span>*</span>
              </Form.Label>
              {show ? <Form.Control type="name" placeholder="" value={show[0].accountnumber} onChange={(event)=>{setName(event.target.value)}} required /> : <Form.Control type="name" placeholder=""  onChange={(event)=>{setName(event.target.value)}} required />}
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group
              as={Col}
              className="left col-lg-6 col-12"
              controlId="formGridNameproduct"
            >
              <Form.Label>
                ชื่อสินค้า<span>*</span>
              </Form.Label>
              {show ? <Form.Control type="name" placeholder="" value={show[0].nameproduct} onChange={(event)=>{setName(event.target.value)}} required /> : <Form.Control type="name" placeholder=""  onChange={(event)=>{setName(event.target.value)}} required />}
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCategory">
              <Form.Label>
                หมวดหมู่สินค้า<span>*</span>
              </Form.Label>
              {show ? <Form.Control as="select" defaultValue="Choose..."   required     value={show[0].productcategory} onChange={(event)=>{
                //value={show[0].productcategory}
                setProductcategory(event.target.value)
              }}>
                <option>เลือก...</option>
                <option>แฟชั่น</option>
                <option>ออนไลน์</option>
              </Form.Control> : <Form.Control as="select" defaultValue="Choose..."   required  onChange={(event)=>{
                //value={show[0].productcategory}
                setProductcategory(event.target.value)
              }}>
                <option>เลือก...</option>
                <option>แฟชั่น</option>
                <option>ออนไลน์</option>
              </Form.Control>}
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group
              as={Col}
              className="left col-lg-6 col-12"
              controlId="formGridPrice"
            >
              <Form.Label>
                จำนวนเงิน (บาท)<span>*</span>
              </Form.Label>
              {show ? <Form.Control type="name" placeholder="" value={show[0].money} onChange={(event)=>{setName(event.target.value)}} required /> : <Form.Control type="name" placeholder=""  onChange={(event)=>{setName(event.target.value)}} required />}
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCategory">
              <Form.Label>
                ธนาคาร<span>*</span>
              </Form.Label>
              {show ? <Form.Control as="select" defaultValue="Choose..."    value={show[0].bank} required  onChange={(event)=>{
             
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
              </Form.Control> : <Form.Control as="select" defaultValue="Choose..."  required  onChange={(event)=>{
             
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
           </Form.Control>}
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group
              as={Col}
              className="left col-lg-6 col-12"
              controlId="formGridDate"
            >
              <Form.Label>
                วันที่โดนโกง<span>*</span>
              </Form.Label>
              {show ? <Form.Control type="name" placeholder="" value={show[0].datetime} onChange={(event)=>{setName(event.target.value)}} required /> : <Form.Control type="name" placeholder=""  onChange={(event)=>{setName(event.target.value)}} required />}
            </Form.Group>

            <Form.Group as={Col} controlId="formGridSocial">
              <Form.Label>
                ช่องทางที่โดนโกง<span>*</span>
              </Form.Label>
              {show ? <Form.Control as="select" defaultValue="Choose..."   value={show[0].social} required  onChange={(event)=>{
              
                setSocial(event.target.value)
              }}>
                <option>เลือก...</option>
                <option>Facebook</option>
                <option>Instagram</option>
                <option>Twitter</option>
                <option>Line</option>
                <option>Website</option>
              </Form.Control> : <Form.Control as="select" defaultValue="Choose..."  required  onChange={(event)=>{
              
              setSocial(event.target.value)
            }}>
              <option>เลือก...</option>
              <option>Facebook</option>
              <option>Instagram</option>
              <option>Twitter</option>
              <option>Line</option>
              <option>Website</option>
            </Form.Control>}
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>รายละเอียดเพิ่มเติม</Form.Label>
            {show ? <Form.Control type="name" placeholder="" Value={show[0].other} onChange={(event)=>{setName(event.target.value)}} required /> : <Form.Control type="name" placeholder=""  onChange={(event)=>{setName(event.target.value)}} required />}
          </Form.Group>

          <Form.File.Label>
            <span>
              **กรุณาแนบหลักฐานการโอนเงินและหลักฐานการโดนโกง เช่น ภาพถ่ายหน้าจอ
              (แชท)
            </span>
          </Form.File.Label>

          <input
            className="upload"
            type="file"
            onChange={FileUpload}
            multiple
          />
          <div className="img-holder">
            {imagesFile.map((imagePreviewUrl) => {
              return (
                <img
                  key={imagePreviewUrl}
                  className="imgpreview"
                  alt="previewImg"
                  src={imagePreviewUrl}
                />
              );
            })}
          </div>

          <Form.Row>
            <Form.Group id="formGridCheckbox">
              <Form.Check className="checkbox" type="checkbox" required />
              <a className="linkrule" href="about.html">
                ยอมรับข้อตกลง
              </a>
            </Form.Group>
          </Form.Row>

          <Button className="buttonpost" variant="success" type="submit">
            แก้ไข
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Formeditpost;
