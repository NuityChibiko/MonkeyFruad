const { auth, firestore, googleProvider } = require("../models/index");
const express = require("express"),
  passport = require("passport");
(multer = require("multer")), (router = express.Router());
const bcrypt = require("bcryptjs");
const { Result } = require("express-validator");
router.post("/signup", async (req, res) => {
  try {
    const {
      firstname,
      surname,
      sex,
      date,
      province,
      country,
      email,
      password
    } = req.body;
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          if (result) {
            const userRef = firestore.collection("User").doc(result.user.uid);
            userRef.set({
              uid: result.user.uid,
              email: result.user.email,
              firstname: firstname,
              surname: surname,
              sex: sex,
              date: date,
              province: province,
              country: country,
              role: "user",
            });
            return res.json({ msg: "signup success" });
          }
        })
        .catch((err) => {
          res.status(400).json({ error: err });
        }); 
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.post("/googlesignup", function (req, res) {
 try{
  const {
  result
  } = req.body;

  if (result) {
    const userRef = firestore.collection("User").doc(result.user.uid);
    userRef.get().then((doc)=>{
      if(!doc.data()){
      userRef.set({
        uid: result.user.uid,
        email: result.user.email,
        displayName : result.user.displayName,
        photoURL : result.user.photoURL,
        created: new Date().valueOf(),
        role: "user",
      });
      return res.json({ msg: "google signup success" });
    } else {
      res.status(200).json({msg:"มีผู้ใช้งานนี้อยู่แล้ว"})
    }
    })
  }
 }
 catch{(err)=>{
  res.status(400).json({ error: err });
 }
 }
});

router.post("/facebooksignup", function (req, res) {
  try{
   const {
   result
   } = req.body;
   if (result) {
    
     const userRef = firestore.collection("User").doc(result.user.uid);
     userRef.get().then((doc)=>{
       if(!doc.data()){
       userRef.set({
         uid: result.user.uid,
         email: result.user.email,
         displayName : result.user.displayName,
         photoURL : result.user.photoURL,
         created: new Date().valueOf(),
         role: "user",
       });
       return res.json({ msg: "facebook signup success" });
     } else {
       res.status(200).json({msg:"มีผู้ใช้งานนี้อยู่แล้ว"})
     }
     })
   }
  }
  catch{(err)=>{
   res.status(400).json({ error: err });
  }
  }
 });

router.post("/remember", function (req, res) {
  res.json({ success: true });
});
router.post("/login", function (req, res) {
  const { email, password } = req.body;
  const userLogin = auth
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      res.json({ success: result });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});
router.post("/session",(req,res)=>{
  try{
    const {
      result
      } = req.body;
      console.log(result)
    const userRef = firestore.collection("User").doc(result.uid);
    userRef.get().then((doc)=>{
      if(doc.exists){
res.json({data:doc.data()})
      }
    })


  }catch{(err)=>{
console.log(err)
  }}
})



router.get("/:id", function (req, res) {
  const userID = req.params.id;
  res.json({ success: true });
});
module.exports = router;