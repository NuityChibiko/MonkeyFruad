import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Axios from "axios"
import { Link , useHistory} from "react-router-dom";
const Post = () => {
  const [data,Setdata] = useState()
  const history = useHistory()
  const ok = async () =>{
    try{
      let getdata = await axios.get("http://localhost:7000/post/showpost")
      Setdata(getdata.data.item)
      console.log(getdata.data.item)
    }catch(err){
      console.log(err)
    }
    
  }
const deleted = async(id) =>{
  const postdelete = await Axios.post(`http://localhost:7000/post/delete/${id}`)
  console.log(postdelete.data)
}
 


  useEffect(() => {
    ok()
}, [])
  return (
    <div>
      <Navbar />
      <h1> Post</h1>
      {data ? data.map(ok =>{
        return (
        <div>
        {ok.name} <br></br>
        {ok.accountnumber} <br></br>
        {ok.nameproduct} <br></br>
        {ok.money} <br></br>
        {ok.datetime} <br></br>
        <Link to={`/post/edit/${ok.id}`}> Edit </Link>
        <button onClick={deleted(ok.id)}> x </button> 
        </div>
     
      )
      }) : null}
    </div>
  );
};

export default Post;
