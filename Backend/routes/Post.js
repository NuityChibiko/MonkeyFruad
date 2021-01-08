const express = require("express"),
  passport = require("passport");
(multer = require("multer")), 
router = express.Router();
const {firestore} = require("../models/index")
const { v4: uuidv4 } = require('uuid');

// router.get("/", function (req, res) {
//   res.json({ success: true });
// });

router.post("/create", async (req, res) => {
 const {imagesFile,imagesProfile,name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other} = req.body
  try{
    const id = uuidv4()
    const create = await firestore.collection("Post").doc(id).set({imagesFile,imagesProfile,name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other,uid:id})
    
  }catch(err){
    console.log(err)
  }
  res.json({ success: true });
});
router.post("/edit/:id", async (req, res) => {
  const {imagesFile,imagesProfile,name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other} = req.body
  try{
    const update = await firestore.collection("Post").doc().update({imagesFile,imagesProfile,name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other})
    
  }catch(err){
    console.log(err)
  }
  res.json({ success: true });
});
// router.get("/search", function (req, res) {
//   res.json({ success: true });
// });
router.get("/showpost", async (req, res) => {
  try{
    let item = []
    const showpost = await firestore.collection("Post").onSnapshot(ok =>{
     
      ok.forEach(doc =>{
        item.push(doc.data())
      })
      return res.json({
        item
      })
    })
    
  
  }catch(err){
    res.status(500).json({msg : err})
  }
  
  
});

router.post("/delete/:id", async (req, res) => {
  try{
    let getid = req.params.id
    console.log(getid)
    const postdelete = await firestore.collection("Post").doc(getid).delete()
    res.json({ success: true });
  }catch(err){
    res.status(500).json({msg : err})
  }
  
});
// router.post("/comment/:id", function (req, res) {
//     res.json({ success: true });
//   });
module.exports = router;
