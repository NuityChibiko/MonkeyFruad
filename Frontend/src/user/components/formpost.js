import React, { useEffect, useState } from "react";
import { Form, Col, FormControl, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./formpost.css";
const Formpost = () => {
  const fileobj= [];
  const [imagesPreviewUrls, setimagesPreviewUrls] = useState([]);
  const pic = (event) => {
    event.preventDefault()
 
    let files = event.target.files
    fileobj.push(files);

    for (var i = 0; i < fileobj[0].length; i++) {
     let reader = new FileReader();
      reader.readAsDataURL(fileobj[0][i]);
      reader.onload = event => {
      imagesPreviewUrls.push(event.target.result);   
      setimagesPreviewUrls([...new Set(imagesPreviewUrls)]);
      } 

  };
  

    // const reader = new FileReader();
    // let file = event.target.files[0];
    // reader.onload = () => {
    //       setpreviewState(reader.result);
    //       console.log(reader.result)
    // }
    // reader.readAsDataURL(file);
}
console.log(imagesPreviewUrls)
  return (
    <div className="container">
      <div className="container2">
        <div className="profile-headers-img">
          <img
            className="img-circle"
            src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
          />
          <div className="rank-label-container">
            <span className="label label-default rank-label">
              <button className="buttonedit">
                <i class="fas fa-edit"></i>
              </button>
            </span>
          </div>
        </div>
        <Form>
          <Form.Row>
            <Form.Group as={Col} className="left" controlId="formGridName">
              <Form.Label>
                ชื่อ (ผู้โกง)<span>*</span>
              </Form.Label>
              <Form.Control type="name" placeholder="" required />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLastname">
              <Form.Label>
                นามสกุล (ผู้โกง)<span>*</span>
              </Form.Label>
              <Form.Control type="lastname" placeholder="" required />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} className="left" controlId="formGridId">
              <Form.Label>
                เลขบัตรประชาชน (ผู้โกง)<span>*</span>
              </Form.Label>
              <Form.Control type="id" placeholder="" required />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAccountnumber">
              <Form.Label>
                เลขที่บัญชี (ผู้โกง)<span>*</span>
              </Form.Label>
              <Form.Control type="accountnumber" placeholder="" required />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group
              as={Col}
              className="left"
              controlId="formGridNameproduct"
            >
              <Form.Label>
                ชื่อสินค้า<span>*</span>
              </Form.Label>
              <Form.Control type="nameproduct" placeholder="" required />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCategory">
              <Form.Label>
                หมวดหมู่สินค้า<span>*</span>
              </Form.Label>
              <Form.Control as="select" defaultValue="Choose..." required>
                <option>เลือก...</option>
                <option>แฟชั่น</option>
                <option>ออนไลน์</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} className="left" controlId="formGridPrice">
              <Form.Label>
                จำนวนเงิน (บาท)<span>*</span>
              </Form.Label>
              <Form.Control type="nameproduct" placeholder="" required />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCategory">
              <Form.Label>
                ธนาคาร<span>*</span>
              </Form.Label>
              <Form.Control as="select" defaultValue="Choose..." required>
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
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} className="left" controlId="formGridDate">
              <Form.Label>
                วันที่โดนโกง<span>*</span>
              </Form.Label>
              <Form.Control type="datetime-local" placeholder="" required />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridSocial">
              <Form.Label>
                ช่องทางที่โดนโกง<span>*</span>
              </Form.Label>
              <Form.Control as="select" defaultValue="Choose..." required>
                <option>เลือก...</option>
                <option>Facebook</option>
                <option>Instagram</option>
                <option>Twitter</option>
                <option>Line</option>
                <option>Website</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>รายละเอียดเพิ่มเติม</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>

          <Form.File id="formcheck-api-regular">
            <Form.File.Label>
              <span>
                **กรุณาแนบหลักฐานการโอนเงินและหลักฐานการโดนโกง เช่น
                ภาพถ่ายหน้าจอ (แชท)
              </span>
            </Form.File.Label>
            <Form.File.Input
              name="file[]"
              multiple
              onChange={pic}
              required
            />
          </Form.File>
          
          {imagesPreviewUrls.map((imagePreviewUrl) => {
            return <div className="img-holder">
            <img key={imagePreviewUrl} src={imagePreviewUrl} alt="" id="img" />
          </div>
        })}
         

          <Form.Row>
            <Form.Group id="formGridCheckbox">
              <Form.Check className="checkbox" type="checkbox" required />
              <a className="linkrule" href="about.html">
                ยอมรับข้อตกลง
              </a>
            </Form.Group>
          </Form.Row>

          <Button className="buttonpost" variant="success" type="submit">
            โพสต์
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Formpost;
