import React, { useEffect, useState, useContext } from "react";
import { Form, Col, FormControl, Button } from "react-bootstrap";
import {Link} from "react-router-dom"
import Axios from "axios"

const Commentitem = ({data, ok}) => {
    const [isActive, setIsActive] = useState(false);
    const onClick = () => setIsActive(!isActive);


    return (
    <div>
        <div class="vl"></div>
        <div className="mypost-comment-img1">
            <img className="img-circle1" src="/img/profile.png" />
            <div className="mypost-comment-name1">
                @Nuitychibiko{" "}
                <span className="mypost-comment-time1"> 40 นาที </span>
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
                                    to={`/post/edit/${ok.uid}`}
                                >
                                    แก้ไขคอมเมนต์
                                </Link>
                                </a>
                            </li>
                            <li className="li-mypostcommentmenusetting">
                                <a
                                className="a-mypostcommentmenusetting"
                                // onClick={() => deleted(ok.uid)}
                                >
                                {" "}
                                ลบคอมเมนต์{" "}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <br />
            <div className="mypost-comment-comments1">
                {data.commment}
            </div>
        </div>
    </div>
);
};

export default Commentitem;