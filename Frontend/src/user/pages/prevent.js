import React from "react";
import Navbar from "../components/navbar";
import Chatbot from "../components/chatbot";
import "./prevent.css";
import {Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const Prevent = () => {
  return (
    <div>
      <Navbar />
      <div className="h1-prevent">รู้ไว้ไม่โดนโกง</div>
      <div className="container-prevent">
          <div className="a1-prevent a1-left-prevent">
            <img src="/img/prevent1.png" className="image1-prevent" />
            <p className="text-content-prevent">ซื้อสินค้าออนไลน์แล้ว<br className="br-prevent"/>ไม่ได้รับสินค้าตามกำหนด</p>
          </div>
          <div className="a1-prevent a1-right-prevent">
            <img src="/img/prevent2.png" className="image1-prevent" />
            <p className="text-content-prevent">ล่อลวงให้โอนเงินค่าสินค้าล่วงหน้า<br className="br-prevent"/>โดยไม่มีหลักฐานที่น่าเชื่อถือเพียงพอ</p>
          </div>
          <div className="a1-prevent">
            <img src="/img/prevent3.png" className="image1-prevent" />
            <p className="text-content-prevent">เมื่อโอนเงินแล้วผู้ขายจะหายตัวไป<br className="br-prevent"/>ปิดช่องทางการติดต่อทุกทาง<p className="text-none-prevent textwhite-prevent">a<br/></p></p>
          </div>
          <div className="b1-prevent b1-left-prevent">
            <img src="/img/prevent6.png" className="image1-prevent" />
            <p className="text-content-prevent">ปลอม SMS จากธนาคารเพื่อ<br className="br-prevent"/>หลอกโอนเงิน หรือหลอกว่าให้<br className="br-prevent"/>โอนเงินคืน เพราะโอนเงินเกิน</p>
          </div>
          <div className="b1-prevent b1-right-prevent">
            <img src="/img/prevent7.png" className="image1-prevent" />
            <p className="text-content-prevent">อ้างว่า เว็บซื้อขายสินค้า เป็นคนกลาง<br className="br-prevent"/>ในการซื้อขายสินค้า ให้เหยื่อติดต่อ<br className="br-prevent"/>รับเงินจากคืนเว็บไซต์เอง</p>
          </div>
          <div className="a1-prevent">
            <img src="/img/prevent4.png" className="image1-prevent" />
            <p className="text-content-prevent">เปลี่ยนชื่อและเบอร์โทรฯ <br className="text-none2-prevent"/> ไม่ซ้ำกัน<p className="text-none textwhite-prevent"><br/>a<br/><br className="text-none3-prevent"/></p></p>
          </div>
          <div className="a1-prevent">
            <img src="/img/prevent5.png" className="image1-prevent" />
            <p className="text-content-prevent">นัดเจอเพื่อรับของก่อนแล้วโอนทีหลัง</p>
          </div>
          <div className="a1-prevent">
            <img src="/img/prevent8.png" className="image1-prevent" />
            <p className="text-content-prevent">ขายสินค้าถูกกว่าท้องตลาดเกินไป</p>
          </div>
        </div>
       <Chatbot/>
      </div>
      

  );
};

export default Prevent;