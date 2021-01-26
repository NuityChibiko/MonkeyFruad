<<<<<<< HEAD
import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
=======
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
>>>>>>> b8164355389d358d0a4a1df7e6033a8b9b827ea9

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

  return loading ? (
    ""
  ) : (( admin ? 
    (
    <div>
      <Router>
        <MDBNavbar light expand="md" className="navbarnew">
          <MDBNavbarBrand href="/">
            <img src="/img/logo-mf.png" className="logo-nav" />
          </MDBNavbarBrand>
          <MDBNavbarToggler />
          <MDBCollapse id="navbarCollapse3" navbar>
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
    </div>
  ) : (
    <Router>
<<<<<<< HEAD
      <MDBNavbar color="default-color" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Navbar</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to="#!">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">Features</MDBNavLink>
=======
      <MDBNavbar light expand="md" className="navbarnew">
        <MDBNavbarBrand href="/">
          <img src="/img/logo-mf.png" className="logo-nav" />
        </MDBNavbarBrand>
        <MDBNavbarToggler />
        <MDBCollapse id="navbarCollapse3" navbar>
          <MDBNavbarNav left className="center-nav">
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-none d-md-inline">โพสต์</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="/post">โพสทั้งหมด</MDBDropdownItem>
                  <MDBDropdownItem href="/linkruleshow">
                    สร้างโพส
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            <MDBNavItem>
                <Nav.Link href="/ranking">จัดอันดับคนโกง</Nav.Link>
>>>>>>> b8164355389d358d0a4a1df7e6033a8b9b827ea9
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">Pricing</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown className="">
                <MDBDropdownToggle nav caret>
                  <div className="d-none d-md-inline">Dropdown</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
<<<<<<< HEAD
                  <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="#!">
                <MDBIcon fab icon="twitter" />
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="#!">
                <MDBIcon fab icon="google-plus-g" />
              </MDBNavLink>
=======
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
              <div className="md-form my-0">
                <input
                  className="form-control mr-sm-2"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                />
              </div>
>>>>>>> b8164355389d358d0a4a1df7e6033a8b9b827ea9
            </MDBNavItem>
            <MDBNavItem>
              {user ? (
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <MDBIcon icon="user" />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default">
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
                <Nav.Link href="/login">เข้าสู่ระบบ</Nav.Link>
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
