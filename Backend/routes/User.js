const {auth,firestore,googleProvider} = require("../models/index")
const express = require("express"),
passport = require("passport");
(multer = require("multer")), (router = express.Router());
const bcrypt = require("bcryptjs");
const { Result } = require("express-validator");
router.post("/signup", async (req, res) =>{
  try {
const {firstname,surname,sex,date,province,country,email,password} = req.body
auth.createUserWithEmailAndPassword(email,password).then(async(result)=>{
  res.json({msg:result})
  if(!!result){
    const userRef = firestore.collection("User").doc(result.user.uid)
    const doc = await userRef.get()
    res.json({msg:doc})
    if(!doc.data()){
      await userRef.set({
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
    }
  }
}
).catch((err)=>{
  res.status(400).json({error : err.message})
})
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
    // const {email,password} = req.body
    // const userLogin =  auth.signInWithEmailAndPassword(email,password)
    // if(!userLogin)
    // res.json({ success: true });
});


router.get("/:id", function (req, res) {
  const userID = req.params.id;
  res.json({ success: true });
});
module.exports = router;
