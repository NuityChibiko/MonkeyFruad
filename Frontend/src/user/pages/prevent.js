import React from "react";
import Navbar from "../components/navbar";
import "./prevent.css";
import { Image } from "react-bootstrap";
const Prevent = () => {
  return (
    <div>
      <Navbar />
      <h1>รู้ไว้ไม่โดนโกง</h1>
      <div className="container-prevent">
        <div className="row">
          <div className="column">
            <img src="/img/prevent1.png" className="image" />
            <p className="text">
              ซื้อสินค้าออนไลน์แล้ว
              <br />
              ไม่ได้รับสินค้าตามกำหนด
            </p>
          </div>
          <div className="column">
            <img src="/img/prevent2.png" className="image" />
            <p className="text">
              ล่อลวงให้โอนเงินค่าสินค้าล่วงหน้า
              <br />
              โดยไม่มีหลักฐานที่น่าเชื่อถือเพียงพอ
            </p>
          </div>
          <div className="column">
            <img src="/img/prevent3.png" className="image" />
            <p className="text">
              เมื่อโอนเงินแล้วผู้ขายจะหายตัวไป
              <br />
              ปิดช่องทางการติดต่อทุกทาง
            </p>
          </div>
        </div>
        <div className="row">
          <div className="column a">
            <img src="/img/prevent6.png" className="image" />
            <p className="text">
              ปลอม SMS จากธนาคารเพื่อ
              <br />
              หลอกโอนเงิน หรือหลอกว่าให้
              <br />
              โอนเงินคืน เพราะโอนเงินเกิน
            </p>
          </div>
          <div className="column b">
            <img src="/img/prevent7.png" className="image" />
            <p className="text">
              อ้างว่า เว็บซื้อขายสินค้า เป็นคนกลาง
              <br />
              ในการซื้อขายสินค้า ให้เหยื่อติดต่อ
              <br />
              รับเงินจากคืนเว็บไซต์เอง
            </p>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <img src="/img/prevent4.png" className="image" />
            <p className="text">เปลี่ยนชื่อและเบอร์โทรฯ ไม่ซ้ำกัน</p>
          </div>
          <div className="column">
            <img src="/img/prevent5.png" className="image" />
            <p className="text">นัดเจอเพื่อรับของก่อนแล้วโอนทีหลัง</p>
          </div>
          <div className="column">
            <img src="/img/prevent8.png" className="image" />
            <p className="text">ขายสินค้าถูกกว่าท้องตลาดเกินไป</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prevent;
