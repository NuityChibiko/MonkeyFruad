const {auth,firestore,googleProvider} = require("../models/index")
const express = require("express"),
passport = require("passport");
(multer = require("multer")), (router = express.Router());
const bcrypt = require("bcryptjs");
const { Result } = require("express-validator");
router.post("/signup", async (req, res) =>{
  try {
const {firstname,surname,sex,date,province,country,email,password,repass} = req.body
if(repass !== password){
return res.json({msg:"password and repass not match"})
}
else{
auth.createUserWithEmailAndPassword(email,password).then((result)=>{
  if(result){
    const userRef = firestore.collection("User").doc(result.user.uid)
       userRef.set({
        uid:result.user.uid,
        email : result.user.email,
        firstname : firstname,
        surname : surname,
        sex:sex,
        date:date,
        province:province,
        country:country,
        role:"user"
      })
      return res.json({msg:"ok"})
  }
}
).catch((err)=>{
  res.status(400).json({error : err})
})}
  }
  catch (err){
    res.status(400).json({error : err.message})
}


   
        // const { username,password,passwordcheck,firstname,lastname} = req.body
    
        // if(!username || !password || !firstname || !lastname || !passwordcheck){
        //     return res.status(400).json({msg : "กรุณากรอกให้ครบถ้วน"})
        // }
        // if(password !== passwordcheck){
        //     return res.status(400).json({msg : "รหัสผ่านไม่ตรงกัน"})
        // }
        // const userexit = await db.query("SELECT * FROM login WHERE username = ?", [username])
        //     console.log(userexit)
        //     if(userexit.length){
        //         return res.status(400).json({msg : "User ได้ใช้งานไปแล้ว"})
        //     }
        //         const passwordhash = await bcrypt.hash(password,10)
        //      let register = await db.query("INSERT INTO login (username,password,status) VALUES (?,?,?) ",[username,passwordhash,"student"])   
                
        //         const register2 =  await db.query("INSERT INTO student (student_id,firstname,lastname,branch) VALUES (?,?,?,?) ",[username,firstname,lastname,branch])  
              
        // }catch (err){
        //     res.status(500).json({error : err.message})
        // }
    
  });

router.post("/remember", function (req, res) {
  res.json({ success: true });
});
router.post("/login", function (req, res) {
    const {email,password} = req.body
    const userLogin =  auth.signInWithEmailAndPassword(email,password).then((result)=>{
      
      res.json({ success:result });
    }).catch((err)=>{
      res.status(400).json({error : err})
    })
    
});


router.get("/:id", function (req, res) {
  const userID = req.params.id;
  res.json({ success: true });
});
module.exports = router;
