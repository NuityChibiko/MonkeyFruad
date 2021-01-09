import React, {useEffect,useRef,useState,useContext} from "react";
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./navbar.css";
import { firestore, auth} from "../Frontfirebase";
import usercontext from "../context/usercontext"

const Usernvabar = () => {

  let { user , setUser} = useContext(usercontext)

  const logout = () =>{
    auth.signOut().then(()=>{
      setUser(null)
      console.log("Signout")
    }).catch((err)=>{
      console.log(err)
    })
  }
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
              <NavDropdown.Item href="/post/create">สร้างโพสต์</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/ranking">จัดอันดับคนโกง</Nav.Link>
            <NavDropdown title="ช่วยเหลือ" id="basic-nav-dropdown">
              <NavDropdown.Item href="/prevent">รู้ไว้ไม่โดนโกง</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/help">ช่องทางการช่วยเหลือ</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/contractus">ติดต่อเรา</Nav.Link>
           
          </Nav>
          <Form inline>
              <FormControl type="text" placeholder="ค้นหาด้วยชื่อหรือเลขที่บัญชี" className="mr-sm-2" />
              <Button className="button"><i className="material-icons">search</i></Button>
            </Form>
          {user ?  (<button onClick={logout}>logout</button>) : (
              <Nav.Link className="link" href="/login">เข้าสู่ระบบ</Nav.Link>
            )}
            
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
export default Usernvabar;
