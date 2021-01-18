import React, { useEffect, useState ,useContext} from "react";
import { Form, Col, FormControl, Button } from "react-bootstrap";
import {Link} from "react-router-dom"
import Navbar from "../components/navbar";
import "./history.css";
import usercontext from "../context/usercontext"
import Axios from "axios"
import { auth, googleProvider, facebookProvider } from "../Frontfirebase";
import Chatbot from "../components/chatbot";

const History = () => {
  const [isActive, setIsActive] = useState(false);
  const onClick = () => {
    setIsActive(!isActive);
  }
  const [mypost,   Setmypost] = useState();
  // let { user , setUser} = useContext(usercontext)

  let user = auth.currentUser;

    const deleted = async(uid) =>{
      if(user){
      const postdelete = await Axios.post(`http://localhost:7000/post/delete/${uid}`)
      console.log(postdelete.data)

      const ok = await Axios.post("http://localhost:7000/user/session", {result:user})
      console.log(ok.data.item)
      Setmypost(ok.data.item) 
    }
    }
     

 
    
const ok =async () =>{
  try{
      
      
        const ok = await Axios.post("http://localhost:7000/user/session", {result:user})
        console.log(ok.data.item)
        Setmypost(ok.data.item)
      
  
  }catch(err){
      console.log("error")
  }
}
useEffect(() => {
ok()

}, [user])    

  return (
    <div>
      <Navbar />
      <h1 className="h1-history">ประวัติการโพสต์</h1>
      <div className="container-history5">{mypost ? <h2 className="h2-history2">ทั้งหมด {mypost.length} โพสต์</h2> : null}</div>
      {mypost ? mypost.map((ok,index) =>{
        return (
          <div>
           
      <div className="container-history1" key={index}>
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
                      <a className="a-historymenusetting"><Link className="a-historymenusetting1" to={`/post/edit/${ok.uid}`}>แก้ไขโพสต์</Link></a>
                      </li>
                      <li className="li-historymenusetting">
                      <a className="a-historymenusetting" onClick={() =>  deleted(ok.uid)}> ลบโพสต์ </a> 
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
                  <span className="spanhistory">{ok.name} {ok.surname}</span>
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
                    <span className="spanhistory">{ok.accountnumber}</span>
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
                  <span className="spanhistory">{ok.nameproduct} </span>
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
                  <span className="spanhistory">{ok.money} </span>
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
                  <span className="spanhistory">{ok.date} </span>
                </Form.Group>
              </Form.Row>
            </Form>
            <div className="historyother">
              <Link className="historyother1" to={`/mypost/${ok.uid}`}>ดูเพิ่มเติม</Link>
            </div>
          </div>
        </div>
      </div>
          </div>
        )
      }) : null}
    
    <Chatbot/>
    </div>
  );
};

export default History;