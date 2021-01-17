import React, { useContext, useEffect, useRef, useState } from "react";
import { NavDropdown,Form,FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./navbar.css";
import { firestore, auth} from "../Frontfirebase";
import usercontext from "../context/usercontext"
import DropdownPost from './Dropdown_post';
import DropdownHelp from './Dropdown_help';
import { Button } from './Button';

const Usernvabar = () => {

  let { user , setUser} = useContext(usercontext)
  let { isLogin,setisLogin} = useContext(usercontext)

  const logout = () =>{
    auth.signOut().then(()=>{
      setUser(null)
      console.log("Signout")
    }).catch((err)=>{
      console.log(err)
    })
  }

  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };
 
  return (
    <>
      <nav className="navbar">
        <Link to='/' className='navbar-logo head' onClick={closeMobileMenu}>
          MonkeyFraud
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li
              className='nav-item'
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <Link
                to='/post'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                โพสต์ <i className='fas fa-caret-down' />
              </Link>
              {dropdown && <DropdownPost />}
          </li>
          <li className='nav-item'>
            <Link
              to='/ranking'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              จัดอันดับคนโกง
            </Link>
          </li>
          <li
              className='nav-item'
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <Link
                to='/prevent'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                ช่วยเหลือ <i className='fas fa-caret-down' />
              </Link>
              {dropdown && <DropdownHelp />}
          </li>
          <li className='nav-item'>
            <Link
              to='/contractus'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              ติดต่อเรา
            </Link>
          </li>
        </ul>
        <Button />



          
          
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
                <NavDropdown.Item href="/helpnew">ช่องทางการช่วยเหลือ</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/contractus">ติดต่อเรา</Nav.Link>
            
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="ค้นหาด้วยชื่อหรือเลขที่บัญชี" className="mr-sm-2" />
                <Button className="button"><i className="material-icons">search</i></Button>
            </Form>
            { user ?  (<button onClick={logout}>logout</button>) : (
                <Nav.Link className="link" href="/login">เข้าสู่ระบบ</Nav.Link>
              )}
          </Navbar.Collapse>

      </nav>
    </>
  );
}

export default Usernvabar;
