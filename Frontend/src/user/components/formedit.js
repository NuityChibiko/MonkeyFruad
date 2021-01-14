import React, { useEffect, useState, Component } from "react";
import { Form, Col, FormControl } from "react-bootstrap";
import {useParams } from "react-router-dom"
import {
  auth,
  googleProvider,
  facebookProvider,
  firestore
} from "../Frontfirebase";
import "bootstrap/dist/css/bootstrap.min.css";
import "./formedit.css";
import Axios from "axios"
import _ from "lodash"
// import image from "D:/PROJECT ALL/MonkeyFruad/Frontend/src/uploads/logo192.png"


const Formedit = () => {

  // เก็บ State ทุก Input เพื่อส่งไปหลังบ้าน
  const [show, Setshow] = useState();
  const [imagesFile, setImagesFile] = useState(); //สร้าง State เพื่อเก็บไฟล์ที่อัพโหลด
  const [imagesProfile, setImagesProfile] = useState(); //สร้าง State เพื่อเก็บรูปโปรไฟล์
  const [files, Setfiles] = useState();
  const [photo, Setphoto] = useState();
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
  // const [files, setfiles] = useState();
   

// console.log(files)
  const { uid } = useParams()
  // ฟังก์ชันเปลี่ยนรูปโปร
  const ProfileChange = (event) => {  
  
    event.preventDefault(); // ใส่ไว้ไม่ให้ refresh หน้าเว็บ
    let files = event.target.files; //ใช้เพื่อแสดงไฟลทั้งหมดที่กดเลือกไฟล
    Setphoto(files[0])
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
    Setfiles(files)

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
    console.log(show)
 
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
      let formdata = new FormData()
      _.forEach(files , file => {
        formdata.append("eiei" ,file)
      })
      formdata.append("photo" , photo)
      formdata.append("name" , name)
      formdata.append("surname" , surname)
      formdata.append("id" , id)
      formdata.append("accountnumber" , accountnumber)
      formdata.append("nameproduct" , nameproduct)
      formdata.append("productcategory" , productcategory)
      formdata.append("money" , money)
      formdata.append("bank" , bank)
      formdata.append("datetime" , datetime)
      formdata.append("social" , social)
      formdata.append("other" , other)
      // let sentdata = {imagesFile,imagesProfile,name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other}
      let data = await Axios.post(`http://localhost:7000/post/edit/${uid}`,formdata)
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div>
      {show ? show.map(ok=>{
        return (
          <div>
      <div className="container-formpost">
      <div className="container-formpost1">
        <div className="profile-badformpost-img">
          {imagesProfile ? <img className="img-circle" src={imagesProfile} /> : ok.file ? <img className="img-circle" src={`/uploads/${ok.file[0].filename}`} /> : <img className="img-circle" src={"/img/profile.png"} />}
          <div className="rank-label-container-edit">
            <span className="label label-default rank-label">
              <div className="formedit-ImageUpload">
                <label htmlFor="FileInput">
                  <div className="fileinputedit">
                    <img className="uploadiconprofileedit" src="/img/edit.png" />
                  </div>
                </label>
                <div className="buttoninputeditprofile">
                  <input
                    className="uploadinputeditprofile"
                    id="FileInput"
                    type="file"
                    onChange={ProfileChange}
                  
                  />
                </div>
              </div>
            </span>
          </div>
        </div>
        <Form className="formsize-formedit" onSubmit={handlesubmit}>
          <Form.Row>
            <Form.Group
              as={Col}
              className="formedit-left col-lg-6 col-12"
              controlId="formGridName"
            >
              <Form.Label>
                ชื่อ (ผู้โกง)<span className="spanformedit">*</span>
              </Form.Label>

              {show ? <Form.Control type="text" placeholder="" value={name} onChange={(event)=>{setName(event.target.value)}} required /> : null }
              {/* <Form.Control type="name" placeholder=""  onChange={(event)=>{setName(event.target.value)}} required />} */}
              </Form.Group>

            <Form.Group as={Col} controlId="formGridLastname">
              <Form.Label>
                นามสกุล (ผู้โกง)<span className="spanformedit">*</span>
              </Form.Label>
              {show ? <Form.Control type="name" placeholder="" value={surname} onChange={(event)=>{setSurname(event.target.value)}} required /> : null}
              {/* <Form.Control type="name" placeholder=""  onChange={(event)=>{setSurname(event.target.value)}} required />} */}
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group
              as={Col}
              className="formedit-left col-lg-6 col-12"
              controlId="formGridId"
            >
              <Form.Label>
                เลขบัตรประชาชน (ผู้โกง)<span className="spanformedit">*</span>
              </Form.Label>
              {show ? <Form.Control type="name" placeholder="" value={id} onChange={(event)=>{setId(event.target.value)}} required /> : null}
              {/* <Form.Control type="name" placeholder=""  onChange={(event)=>{setId(event.target.value)}} required />} */}
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAccountnumber">
              <Form.Label>
                เลขที่บัญชี (ผู้โกง)<span className="spanformedit">*</span>
              </Form.Label>
              {show ? <Form.Control type="name" placeholder="" value={accountnumber} onChange={(event)=>{setAccountnumber(event.target.value)}} required /> : null}
              {/* <Form.Control type="name" placeholder=""  onChange={(event)=>{setAccountnumber(event.target.value)}} required />} */}
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group
              as={Col}
              className="formedit-left col-lg-6 col-12"
              controlId="formGridNameproduct"
            >
              <Form.Label>
                ชื่อสินค้า<span className="spanformedit">*</span>
              </Form.Label>
              {show ? <Form.Control type="name" placeholder="" value={nameproduct} onChange={(event)=>{setNameproduct(event.target.value)}} required /> : null}
              {/* <Form.Control type="name" placeholder=""  onChange={(event)=>{setNameproduct(event.target.value)}} required />} */}
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCategory">
              <Form.Label>
                หมวดหมู่สินค้า<span className="spanformedit">*</span>
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
              className="formedit-left col-lg-6 col-12"
              controlId="formGridPrice"
            >
              <Form.Label>
                จำนวนเงิน (บาท)<span className="spanformedit">*</span>
              </Form.Label>
              {show ? <Form.Control type="name" placeholder="" value={money} onChange={(event)=>{setMoney(event.target.value)}} required /> : null}
              {/* <Form.Control type="name" placeholder=""  onChange={(event)=>{setMoney(event.target.value)}} required />} */}
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCategory">
              <Form.Label>
                ธนาคาร<span className="spanformedit">*</span>
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
              className="formedit-left col-lg-6 col-12"
              controlId="formGridDate"
            >
              <Form.Label>
                วันที่โดนโกง<span className="spanformedit">*</span>
              </Form.Label>
              {show ? <Form.Control type="name" placeholder="" value={datetime} onChange={(event)=>{setDatetime(event.target.value)}} required /> : null }
              {/* <Form.Control type="name" placeholder=""  onChange={(event)=>{setDatetime(event.target.value)}} required />} */}
            </Form.Group>

            <Form.Group as={Col} controlId="formGridSocial">
              <Form.Label>
                ช่องทางที่โดนโกง<span className="spanformedit">*</span>
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
            <span className="spanformedit">
              **กรุณาแนบหลักฐานการโอนเงินและหลักฐานการโดนโกง เช่น ภาพถ่ายหน้าจอ
              (แชท)
            </span>
          </Form.File.Label>
            {/* {ok ? ok.files.map(res => {
              return ( <div>
                <input
                className="uploadsformpostuploadslip"
                type="file"
                onChange={FileUpload}
                multiple
                value={res.filename}
              />
              </div>
            )
            }) : null} */}
          <input
            className="uploadsformedituploadslip"
            type="file"
            onChange={FileUpload}
            multiple
            
      
          />
          <div className="container-img-holder-imgpreviewedit">
            {imagesFile ? imagesFile.map((imagePreviewUrl) => {
              return (
                <img
                  key={imagePreviewUrl}
                  className="imgpreviewedit"
                  alt="previewImg"
                  src={imagePreviewUrl}
                  style={{ overflow: "hidden" }}
                  onMouseOver={(e) => (e.currentTarget.style = { transform: "scale(1.25)", overflow: "hidden" })}
                  onMouseOut={(e) => (e.currentTarget.style = { transform: "scale(1)", overflow: "hidden" })}
                />
              );
            }) :    ok.files ? ok.files.map(res => { 
              return ( <div>
                <img src={`/uploads/${res.filename}`}  /> 
             </div>
           )
           }) : null }
             

        
          </div>
            
          {/* <Form.Row className="linkrule1">
            <Form.Check aria-label="option 1" className="linkrule2"/><a className="linkrule3" href="about.html">ยอมรับข้อตกลง</a>
          </Form.Row> */}

          <button className="buttonformedit" variant="success" type="submit">
            โพสต์
          </button>
        
        </Form>
      </div>
    </div>
          </div>
        )
      }) : null}
   
    
    </div>
  );
};

export default Formedit;
