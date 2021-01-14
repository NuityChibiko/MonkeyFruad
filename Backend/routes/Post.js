const express = require("express"),
  passport = require("passport");
 
router = express.Router();
const {firestore} = require("../models/index")
const admin = require("firebase-admin");
const moment = require("moment")
const { v4: uuidv4 } = require('uuid');
const {cloudinary} = require("../utils/cloudinary")
const multer = require("multer");
const path = require("path");


let storage = multer.diskStorage({
  destination: (req,file,cb) =>{
    // cb(null, path.join(__dirname, 'uploads'))
    cb(null, "D:/PROJECT ALL/MonkeyFruad/Frontend/public/uploads/")
  },
  filename : (req,file,cb) =>{
    cb(null , file.fieldname + "-" + Date.now() + path.extname(file.originalname))
  }
})

let upload = multer({
  storage:storage
})


// router.get("/", function (req, res) {
//   res.json({ success: true });
// });

router.post("/create", upload.fields([{name: "photo" ,maxCount:1} , {name: "eiei" , maxCount:10} ]) ,async(req, res) => { 
 const {name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other,useruid} = req.body
  try{
    const uid = uuidv4()
    const date = moment().format('MM/DD/YYYY, h:mm:ss')

   
    let file = req.files.photo 
    let files = req.files.eiei 
    console.log(file)
    console.log(files)
    if(req.files.photo == undefined && req.files.eiei == undefined){
      const create = await firestore.collection("Post").doc(uid).set({name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other,uid,useruid,date})
    }
    else if(req.files.photo == undefined){
      const create = await firestore.collection("Post").doc(uid).set({name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other,uid,useruid,date,files})
    }
    else if(req.files.eiei == undefined){
      const create = await firestore.collection("Post").doc(uid).set({name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other,uid,useruid,date,file})
    }
    else{
      const create = await firestore.collection("Post").doc(uid).set({name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other,uid,useruid,date,file,files})
    }
  
   
    

     
  
    
    
    
   res.json({ success: true });
  }catch(err){
    console.log(err)
  }
  
});
router.post("/edit/:uid", upload.fields([{name: "photo" ,maxCount:1} , {name: "eiei" , maxCount:10} ]),async (req, res) => {
  let uid = req.params.uid
  const date = moment().format('MM/DD/YYYY, h:mm:ss ')
  const {imagesProfile,name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other} = req.body
  try{
    let file = req.files.photo
    let files = req.files.eiei
    console.log(file)
    console.log(files)
    if(files){
      const update =await firestore.collection("Post").doc(uid).update({name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other,date,files})
    }
    if(file){
      const update =await firestore.collection("Post").doc(uid).update({name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other,date,file})
    }
    if(file && files){
      const update =await firestore.collection("Post").doc(uid).update({name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other,date,file,files})
    }
    const update =await firestore.collection("Post").doc(uid).update({name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other,date})

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



router.get("/mypost/:uid",async(req, res) => {
  try{
    console.log("ok")
    let getid = req.params.uid
  
    const postdelete =await firestore.collection("Post").where("uid" , "==" , getid).get()
    
    postdelete.forEach(doc =>{
      let item = []
      item.push(doc.data())
      res.json({
        item
      })
    })
  }catch(err){
    res.status(500).json({msg : err})
  }
  
});

// router.post("/upload", upload.array("eiei"), async(req, res) => {
//   try{
//         console.log(req.files.path)
//   }catch(err){
//     res.status(500).json({msg : err})
//   }
  
// });
// router.post("/comment/:id", function (req, res) {
//     res.json({ success: true });
//   });


const userRef = firestore.collection("User")




module.exports = router;