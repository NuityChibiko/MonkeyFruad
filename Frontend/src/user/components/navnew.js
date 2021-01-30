import React, { useContext, useEffect, useRef, useState, useMemo } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
  MDBBtn
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";
import "./navnew.css";
import { firestore, auth } from "../Frontfirebase";
import usercontext from "../context/usercontext";
import axios from "axios";
import { Navbar,Nav,NavDropdown,Form,FormControl } from 'react-bootstrap';
const NavbarPage = () => {
  var { user, setUser } = useContext(usercontext);
  const [displayname, setDisplayname] = useState();
  const [role, setRole] = useState();
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isOpen,setIsopen] = useState(false)
  const logout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Signout");
      })
      .catch((err) => {
        console.log(err);
      });
  };
const toggleCollapse = () => {
 setIsopen(!isOpen)
}
  useMemo(() => {
    if (user) {
      if (user.displayName === null) {
        axios
          .post("http://localhost:7000/user/session", { user: user })
          .then((result) => {
            if (result.data.data.role === "admin") {
              setAdmin(true);
            }
            setDisplayname(result.data.data.username);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setDisplayname(user.displayName);
        setRole("user");
      }
    }
    setLoading(false);
  }, [user]);
console.log(displayname)
  return loading ? (
    ""
  ) : (( admin ? 
    (
      <Router>
        <MDBNavbar light expand="md" className="navbarnew">
          <MDBNavbarBrand href="/">
            <img src="/img/logo-mf.png" className="logo-nav" />
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
            <MDBNavbarNav left className="center-nav">
            <MDBNavItem>
            <Nav.Link href="/managepost"> จัดการโพส </Nav.Link>
            </MDBNavItem>
            <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <div className="d-none d-md-inline">ดูรายงาน</div>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default">
                    <MDBDropdownItem href="/non_verifypost">ยังไม่ตรวจสอบ</MDBDropdownItem>
                    <MDBDropdownItem href="/verifypost">
                    ตรวจสอบแล้ว
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
                </MDBNavItem>
                <MDBNavItem>
              <Nav.Link href="/contractus">ติดต่อเรา</Nav.Link>
              </MDBNavItem>
              <MDBNavItem>
              <Nav.Link onClick={logout} href="/login">ออกจากระบบ</Nav.Link>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </Router>
  ) : (
    <Router>
      <MDBNavbar light expand="md" className="navbarnew">
        <Nav.Link href="/"><img src="/img/logo-mf.png" className="logo-nav" /></Nav.Link>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left className="center-nav">
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-none d-md-inline">โพสต์</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="/post">โพสต์ทั้งหมด</MDBDropdownItem>
                  <MDBDropdownItem href="/linkruleshow">
                    สร้างโพสต์
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            <MDBNavItem>
                <Nav.Link href="/ranking">จัดอันดับคนโกง</Nav.Link>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-none d-md-inline">ช่วยเหลือ</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="/prevent">
                    รู้ไว้ไม่โดนโกง
                  </MDBDropdownItem>
                  <MDBDropdownItem href="/help">
                    หน่วยงานที่ให้ความช่วยเหลือ
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            <MDBNavItem>
              <Nav.Link href="/contractus">ติดต่อ</Nav.Link>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <div className=" my-0">
                <input
                  className="box-nav mr-sm-2"
                  type="text"
                  placeholder="ค้นหาด้วยชื่อหรือเลขที่บัญชี"
                  aria-label="Search"
                />
              </div>
            </MDBNavItem>
            <button type="submit" className="button-nav">ค้นหา</button>
            <MDBNavItem>
              {user ? (
                <MDBDropdown>
                  <MDBDropdownToggle nav caret left>
                  <span>{displayname}</span>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default" right>
                    <MDBDropdownItem href="/profile">
                      จัดการโปรไฟล์
                    </MDBDropdownItem>
                    <MDBDropdownItem href="/post/history">
                      ประวัติการโพสต์
                    </MDBDropdownItem>
                    <MDBDropdownItem href="/login" onClick={logout}>
                      ออกจากระบบ
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              ) : (
                <Nav.Link href="/login" >เข้าสู่ระบบ</Nav.Link>
              )}
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </Router>
  )
  ))
};

export default NavbarPage;
