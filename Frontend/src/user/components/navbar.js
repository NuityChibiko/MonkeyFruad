import React, { useContext,useEffect,useRef,useState} from "react";
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./navbar.css";
import { firestore, auth, googleProvider,facebookProvider } from "../Frontfirebase";
const Usernvabar = () => {
  const userRef = useRef(firestore.collection("User")).current;
  const [user,setUser] = useState(null);
  const [isLogin,setisLogin] = useState(false)
  useEffect(()=>{
    const authUnsubscribe = auth.onAuthStateChanged((firebaseUser)=>{
      if(firebaseUser){
        userRef.doc(firebaseUser.uid).onSnapshot((doc)=>{
          if(doc.data()){
            const userData = {
              uid:doc.data().uid,
              email:doc.data().email,
              firstname:doc.data().firstname,
              surname:doc.data().surname,
              country:doc.data().country,
              province:doc.data().province,
              role:doc.data().role,
              sex:doc.data().sex
            };
            setUser(userData);
            setisLogin(true)
          }
      })
      }else{
        setUser(null);
      }
  });return () =>{
authUnsubscribe();
  };
  },[userRef]);

  const logout = () =>{
    auth.signOut().then(()=>{
      setisLogin(false)
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
              <Button className="button"><i class="material-icons">search</i></Button>
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
