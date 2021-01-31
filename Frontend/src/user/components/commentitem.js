import React, { useEffect, useState, useContext } from "react";
import { Form, Col, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./commentitem.css";
import usercontext from "../context/usercontext";



const Commentitem = ({ data, ok ,uid}) => {

  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);
  let { user, setUser } = useContext(usercontext);
  const [allcomment , Setallcomment] = useState()
  const [item , Setitem] = useState([])



  const deleted = async (commentid) => {
      const postdelete = await Axios.post(
        `http://localhost:7000/post/delete/comment/${commentid}`
      );
      console.log(postdelete.data);
      const getcomment = await Axios.get(`http://localhost:7000/post/comment/${uid}`)
      console.log( getcomment.data.item);
      Setallcomment( getcomment.data.item);
     
    
  };

  // const gg = async () => {
  //   try {
  //     const getcomment = await Axios.get(`http://localhost:7000/post/comment/${uid}`)
  //     Setallcomment(getcomment.data.item)

  //   } catch (err) {
  //     console.log("error");
  //   }
  // };
  // useEffect(() => {
  //   gg();
  // }, []);

 
  return (
    <div className="row mypostcommentrow">
      <div className="column1 mypostcommentrow1">
        <div class="vl"></div>
        <div className="mypost-comment-img1">
          <img className="img-circle1" src="/img/profile.png" />
          <div className="mypost-comment-name1">
           {data ? "@" : null}{data.username}
            <span className="mypost-comment-time1"> {data.datetime} </span>
          </div>
          <br />
          <div className="mypost-comment-comments1">
            <div className="mypostcomment1">{data.textcomment}</div> 
          </div>
        </div>
      </div>
      {data.userid == user.uid ? <div className="column2 mypostcommentrow2">
        <div className="menu-containermypostcommentsetting">
          <div onClick={onClick} className="mypostcommentbuttonsetting">
            <img
              className="mypostcommentimg-setting"
              src="/img/setting.png"
              alt="avatar"
            ></img>
          </div>

          <div
            className={`mypostcommentmenusetting ${
              isActive ? "active" : "inactive"
            }`}
          >
            <ul className="ul-mypostcommentmenusetting">
           <li className="li-mypostcommentmenusetting">
                <a className="a-mypostcommentmenusetting">
                  <Link
                    className="a-mypostcommentmenusetting1"
                    to={`/post/edit/${data.commentid}`}
                  >
                    แก้ไขคอมเมนต์
                  </Link>
                </a>
              </li> 
              <li className="li-mypostcommentmenusetting">
                <a
                  className="a-mypostcommentmenusetting"
                  onClick={() => deleted(data.commentid)}
                >
                  {" "}
                  ลบคอมเมนต์{" "}
                </a>
              </li> 
            </ul>
          </div>
        </div>
      </div> : null }
    </div>
  );
};

export default Commentitem;