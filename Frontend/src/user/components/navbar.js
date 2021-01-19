import React, { useContext,useEffect,useRef,useState} from "react";
import { Navbar,Nav,NavDropdown,Form,FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./navbar.css";
import { firestore, auth} from "../Frontfirebase";
import usercontext from "../context/usercontext"
import axios from "axios";

const Usernvabar = () => {
  var { user , setUser} = useContext(usercontext)
  const [displayname , setDisplayname] = useState()
  const logout = () =>{
    auth.signOut().then(()=>{
      console.log("Signout")
    }).catch((err)=>{
      console.log(err)
    })
  }
  const session = () =>{
    console.log("OK")
    axios.post("http://localhost:7000/user/userdata", { user : user })
    .then((result) => {
      setDisplayname(result.data.data.username)
    })
    .catch((err) => {
      console.log(err);
    });
  }
  useEffect(()=>{
    if(user){
    if(user.displayName === null){
      session()
    }
    else{
      setDisplayname(user.displayName)
    }
  }
     },[user]);
console.log(user)
  return (
    <div className="Navbar">
        <Navbar variant="dark" expand="lg">
        <Navbar.Brand href="/" className="head">Monkey Fraud</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="โพสต์" id="basic-nav-dropdown">
              <NavDropdown.Item href="/post">โพสต์ทั้งหมด</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/linkruleshow">สร้างโพสต์</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/ranking">จัดอันดับคนโกง</Nav.Link>
            <NavDropdown title="ช่วยเหลือ" id="basic-nav-dropdown">
              <NavDropdown.Item href="/prevent">รู้ไว้ไม่โดนโกง</NavDropdown.Item>
              <NavDropdown.Divider />
              {/* <NavDropdown.Item href="/help">ช่องทางการช่วยเหลือ</NavDropdown.Item> */}
              <NavDropdown.Item href="/help">ช่องทางการช่วยเหลือ</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/contractus">ติดต่อเรา</Nav.Link>
           
          </Nav>
          <Form inline>
              <FormControl type="text" placeholder="ค้นหาด้วยชื่อหรือเลขที่บัญชี" className="boxsearch" />
              <button className="buttonnavbarsearch"><i className="material-icons">search</i></button>
            </Form>
          { user ?  
              <NavDropdown alignRight title={displayname} id="basic-nav-dropdown">
                <NavDropdown.Item href="/profile">จัดการโปรไฟล์</NavDropdown.Item>
                <NavDropdown.Item href="/post/history">ประวัติการโพสต์</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/login" onClick={logout}>ออกจากระบบ</NavDropdown.Item>
              </NavDropdown>
          // <button onClick={logout}>logout</button>
          : 
              <Nav.Link className="link" href="/login">เข้าสู่ระบบ</Nav.Link>
            }
            
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
export default Usernvabar;
