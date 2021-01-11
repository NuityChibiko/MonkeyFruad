import React, { useEffect, useState } from "react";
import { Form, Col, FormControl, Button } from "react-bootstrap";
import Navbar from "../components/navbar";
import "./history.css";
const History = () => {
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  return (
    <div>
      <Navbar />
      <h1 className="h1-history">ประวัติการโพสต์</h1>
      <h2 className="h2-history2">ทั้งหมด 3 โพสต์</h2>
      <div className="container-history1">
        <div className="container-history2">
          <div className="container-historysetiing">
            <div className="menu-containerhistorysetting">
                <div onClick={onClick} className="historybuttonsetting">
                    <img className="historyimg-setting"
                        src="/img/setting.png"
                        alt="avatar">
                    </img>
                </div>
                <div
                  className={`historymenusetting ${isActive ? "active" : "inactive"}`}>
                  <ul className="ul-historymenusetting">
                      <li className="li-historymenusetting">
                          <a className="a-historymenusetting" href="/post/edit">แก้ไขโพสต์</a>
                      </li>
                      <li className="li-historymenusetting">
                          <a className="a-historymenusetting" href="#">ลบโพสต์</a>
                      </li>
                  </ul>
                </div>
            </div>
          </div>
          <div className="container-history">
            <Form className="formsize-history">
              <Form.Row>
                <Form.Group
                  as={Col}
                  className="้history-left col-lg-6 col-12"
                  controlId="formGridName"
                  >
                  <Form.Label>
                    ชื่อ - นามสกุลผู้โกง
                  </Form.Label>
                </Form.Group>

                <Form.Group>
                  <span className="spanhistory">xxxxxxxx</span>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group
                    as={Col}
                    className="history-left col-lg-6 col-12"
                    controlId="formGridId"
                    >
                    <Form.Label>
                        เลขที่บัญชี (ผู้โกง)
                    </Form.Label>
                </Form.Group>
              
                <Form.Group>
                    <span className="spanhistory">xxxxxxxx</span>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group
                    as={Col}
                    className="history-left col-lg-6 col-12"
                    controlId="formGridNameproduct"
                    >
                    <Form.Label>
                        ชื่อสินค้า
                    </Form.Label>
                </Form.Group>
                
                <Form.Group>
                  <span className="spanhistory">xxxxxxxx</span>
                </Form.Group>
              </Form.Row>


              <Form.Row>
                <Form.Group
                    as={Col}
                    className="history-left col-lg-6 col-12"
                    controlId="formGridPrice"
                    >
                    <Form.Label>
                        จำนวนเงิน (บาท)
                    </Form.Label>
                </Form.Group>
                
                <Form.Group>
                  <span className="spanhistory">xxxxxxxx</span>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group
                    as={Col}
                    className="history-left col-lg-6 col-12"
                    controlId="formGridDate"
                    >
                    <Form.Label>
                        วันที่โพสต์
                    </Form.Label>
                </Form.Group>

                <Form.Group>
                  <span className="spanhistory">xxxxxxxx</span>
                </Form.Group>
              </Form.Row>
            </Form>
            <div className="historyother">
              <a className="historyother1">ดูเพิ่มเติม</a>
            </div>
          </div>
        </div>

        <div className="container-history3">
          <div className="container-historysetiing">
            <div className="menu-containerhistorysetting">
                <div onClick={onClick} className="historybuttonsetting">
                    <img className="historyimg-setting"
                        src="/img/setting.png"
                        alt="avatar">
                    </img>
                </div>
                <div
                  className={`historymenusetting ${isActive ? "active" : "inactive"}`}>
                  <ul className="ul-historymenusetting">
                      <li className="li-historymenusetting">
                          <a className="a-historymenusetting" href="/post/edit">แก้ไขโพสต์</a>
                      </li>
                      <li className="li-historymenusetting">
                          <a className="a-historymenusetting" href="#">ลบโพสต์</a>
                      </li>
                  </ul>
                </div>
            </div>
          </div>
          <div className="container-history">
            <Form className="formsize-history">
              <Form.Row>
                <Form.Group
                  as={Col}
                  className="้history-left col-lg-6 col-12"
                  controlId="formGridName"
                  >
                  <Form.Label>
                    ชื่อ - นามสกุลผู้โกง
                  </Form.Label>
                </Form.Group>

                <Form.Group>
                  <span className="spanhistory">xxxxxxxx</span>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group
                    as={Col}
                    className="history-left col-lg-6 col-12"
                    controlId="formGridId"
                    >
                    <Form.Label>
                        เลขที่บัญชี (ผู้โกง)
                    </Form.Label>
                </Form.Group>
              
                <Form.Group>
                    <span className="spanhistory">xxxxxxxx</span>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group
                    as={Col}
                    className="history-left col-lg-6 col-12"
                    controlId="formGridNameproduct"
                    >
                    <Form.Label>
                        ชื่อสินค้า
                    </Form.Label>
                </Form.Group>
                
                <Form.Group>
                  <span className="spanhistory">xxxxxxxx</span>
                </Form.Group>
              </Form.Row>


              <Form.Row>
                <Form.Group
                    as={Col}
                    className="history-left col-lg-6 col-12"
                    controlId="formGridPrice"
                    >
                    <Form.Label>
                        จำนวนเงิน (บาท)
                    </Form.Label>
                </Form.Group>
                
                <Form.Group>
                  <span className="spanhistory">xxxxxxxx</span>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group
                    as={Col}
                    className="history-left col-lg-6 col-12"
                    controlId="formGridDate"
                    >
                    <Form.Label>
                        วันที่โพสต์
                    </Form.Label>
                </Form.Group>

                <Form.Group>
                  <span className="spanhistory">xxxxxxxx</span>
                </Form.Group>
              </Form.Row>
            </Form>
            <div className="historyother">
              <a className="historyother1">ดูเพิ่มเติม</a>
            </div>
          </div>
        </div>

        <div className="container-history4">
          <div className="container-historysetiing">
            <div className="menu-containerhistorysetting">
                <div onClick={onClick} className="historybuttonsetting">
                    <img className="historyimg-setting"
                        src="/img/setting.png"
                        alt="avatar">
                    </img>
                </div>
                <div
                  className={`historymenusetting ${isActive ? "active" : "inactive"}`}>
                  <ul className="ul-historymenusetting">
                      <li className="li-historymenusetting">
                          <a className="a-historymenusetting" href="/post/edit">แก้ไขโพสต์</a>
                      </li>
                      <li className="li-historymenusetting">
                          <a className="a-historymenusetting" href="#">ลบโพสต์</a>
                      </li>
                  </ul>
                </div>
            </div>
          </div>

          <div className="container-history">
            <Form className="formsize-history">
              <Form.Row>
                <Form.Group
                  as={Col}
                  className="้history-left col-lg-6 col-12"
                  controlId="formGridName"
                  >
                  <Form.Label>
                    ชื่อ - นามสกุลผู้โกง
                  </Form.Label>
                </Form.Group>

                <Form.Group>
                  <span className="spanhistory">xxxxxxxx</span>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group
                    as={Col}
                    className="history-left col-lg-6 col-12"
                    controlId="formGridId"
                    >
                    <Form.Label>
                        เลขที่บัญชี (ผู้โกง)
                    </Form.Label>
                </Form.Group>
              
                <Form.Group>
                    <span className="spanhistory">xxxxxxxx</span>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group
                    as={Col}
                    className="history-left col-lg-6 col-12"
                    controlId="formGridNameproduct"
                    >
                    <Form.Label>
                        ชื่อสินค้า
                    </Form.Label>
                </Form.Group>
                
                <Form.Group>
                  <span className="spanhistory">xxxxxxxx</span>
                </Form.Group>
              </Form.Row>


              <Form.Row>
                <Form.Group
                    as={Col}
                    className="history-left col-lg-6 col-12"
                    controlId="formGridPrice"
                    >
                    <Form.Label>
                        จำนวนเงิน (บาท)
                    </Form.Label>
                </Form.Group>
                
                <Form.Group>
                  <span className="spanhistory">xxxxxxxx</span>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group
                    as={Col}
                    className="history-left col-lg-6 col-12"
                    controlId="formGridDate"
                    >
                    <Form.Label>
                        วันที่โพสต์
                    </Form.Label>
                </Form.Group>

                <Form.Group>
                  <span className="spanhistory">xxxxxxxx</span>
                </Form.Group>
              </Form.Row>
            </Form>
            <div className="historyother">
              <a className="historyother1">ดูเพิ่มเติม</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
