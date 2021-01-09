const express = require("express"),
  passport = require("passport");
(multer = require("multer")), 
router = express.Router();
const {firestore} = require("../models/index")
const admin = require("firebase-admin");
// import * as firebase from 'firebase';
const { v4: uuidv4 } = require('uuid');

// router.get("/", function (req, res) {
//   res.json({ success: true });
// });

router.post("/create", async (req, res) => {
 const {imagesFile,imagesProfile,name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other,useruid} = req.body
  try{
    const uid = uuidv4()
 
    const create = await firestore.collection("Post").doc(uid).set({imagesFile,imagesProfile,name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other,uid,useruid})
    
    return res.json({ success: true });
  }catch(err){
    console.log(err)
  }
  
});
router.post("/edit/:uid", (req, res) => {
  let uid = req.params.uid
  const {imagesFile,imagesProfile,name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other} = req.body
  try{
    const update = firestore.collection("Post").doc(uid).update({imagesFile,imagesProfile,name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other})
    
  }catch(err){
    console.log(err)
  }
  res.json({ success: true });  
});

// router.get("/search", function (req, res) {
//   res.json({ success: true });
// });



// router.get("/showpost",async (req, res) => {
//   try{
    
//     const showpost = await firestore.collection("Post").get()
    
//        showpost.forEach(doc => {
//         let item = doc.data()
//         console.log(item)
      
//        })
//        res.status(200).json([item])
      
       
      

   
//   }catch(err){
//     res.status(500).send(err)
//   }
// });





router.post("/delete/:uid",(req, res) => {
  try{
    let getid = req.params.uid
    console.log(getid)
    const postdelete = firestore.collection("Post").doc(getid).delete()
    res.json({ success: "Delete" });
  }catch(err){
    res.status(500).json({msg : err})
  }
  
});
// router.post("/comment/:id", function (req, res) {
//     res.json({ success: true });
//   });
module.exports = router;
