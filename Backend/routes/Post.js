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
router.post("/edit/:uid",async (req, res) => {
  let uid = req.params.uid
  const {imagesFile,imagesProfile,name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other} = req.body
  try{
    const update =await firestore.collection("Post").doc(uid).update({imagesFile,imagesProfile,name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other})
    
  }catch(err){
    console.log(err)
  }
  
});

// router.get("/search", function (req, res) {
//   res.json({ success: true });
// });

router.get("/edit/:uid",async (req, res) => {
  let uid = req.params.uid

  try{
    const showdata = await firestore.collection("Post").where("uid", "==", uid).get()
    showdata.forEach(doc =>{
      let item = []
      console.log(item)
      item.push(doc.data())
      res.json({
        item
      })
    })
  
  }catch(err){
    console.log(err)
  }

});





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


const userRef = firestore.collection("User")




module.exports = router;