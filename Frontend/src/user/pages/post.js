import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Axios from "axios"
import {
  auth,
  googleProvider,
  facebookProvider,
  firestore
} from "../Frontfirebase";

import { Link , useHistory} from "react-router-dom";
const Post = () => {
  const [data,Setdata] = useState()
  const [show,Setshow] = useState()
  const history = useHistory()
  const ok = async () =>{
  //   try{
  //     let getdata = await axios.get("http://localhost:7000/post/showpost")
  //     Setdata(getdata.data.item)
  //     console.log(data)
  //   }catch(err){
  //     console.log(err)
  //   }
  // }
  
   const showdata = await firestore.collection("Post").onSnapshot((querySnapshot) =>{
     
      let item = []
      querySnapshot.forEach((doc) =>{
        
        item.push(doc.data())
        console.log(item)
      })
      Setshow(item)
    })
  }


  useEffect(() => {
    ok()
   
}, [])



const deleted = async(uid) =>{
  const postdelete = await Axios.post(`http://localhost:7000/post/delete/${uid}`)
  console.log(postdelete.data)
}


  return (
    <div>
      <Navbar />
      <h1> Post</h1>
      {show ? show.map(ok =>{
        return (
        <div>
        {ok.name} <br></br>
        {ok.accountnumber} <br></br>
        {ok.nameproduct} <br></br>
        {ok.money} <br></br>
        {ok.datetime} <br></br>
        <Link to={`/post/edit/${ok.uid}`}> Edit </Link>
        <button onClick={() => deleted(ok.uid)}> x </button> 
        </div>
     
      )
      }) : null}
    </div>
  );
};



export default Post