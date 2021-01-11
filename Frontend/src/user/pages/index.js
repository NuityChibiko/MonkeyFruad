import React, { useEffect, useState ,useContext} from "react";
import Navbar from "../components/navbar";
import usercontext from "../context/usercontext"
import axios from "axios";
const Home = () => {
  let { user , setUser} = useContext(usercontext)
  const [data , setData ]= useState()
// const submit = ()=>{
//   axios.post("http://localhost:7000/user/session", {result:user}).then((result)=>{
//     console.log(result.data.item)
//     setData(result.data)
//   }).catch((err)=>{
//     console.log(err)
//   })
// }

const ok = () =>{
    
  axios.post("http://localhost:7000/user/session", {result:user}).then((result)=>{
        console.log(result.data.item)
        setData(result.data.item)
      }).catch((err)=>{
        console.log(err)
      })
      


}


useEffect(() => {
ok()
}, [user])


  return (
    <div>
      <Navbar />
      {data ? data.map(res =>{
        return (
            <div> {res.name} </div>
        )
      }) : null}
      <h1>Home</h1>
      {/* <a onClick={submit}>enter</a> */}
    </div>
  );
};

export default Home;
