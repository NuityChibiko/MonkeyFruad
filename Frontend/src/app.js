// import package and file
import React, {useEffect,useRef,useState,useContext, createContext} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { firestore, auth} from "./user/Frontfirebase";
import Home from "./user/pages/index";
import Contractus from "./user/pages/contractus";
import Createpost from "./user/pages/createpost";
import Login from "./user/pages/login";
import Post from "./user/pages/post";
import Forgetpass from "./user/pages/forgetpass";
import Signup from "./user/pages/signup";
import Prevent from "./user/pages/prevent";
import Help from "./user/pages/help";
import Rank from "./user/pages/ranking";
import Editpost from "./user/pages/editpost";
import History from "./user/pages/history";
import Mypost from "./user/pages/mypost";
import "./app.css";
import Axios from "axios"
import usercontext from "./user/context/usercontext"


// ที่รวม Routh ต่างๆ
const App = () => {
  const userRef = useRef(firestore.collection("User")).current;
  const [user,setUser] = useState();

  useEffect(()=>{
    const authUnsubscribe = auth.onAuthStateChanged((firebaseUser)=>{
      if(firebaseUser){
        userRef.doc(firebaseUser.uid).onSnapshot((doc)=>{
          if(doc.data()){
            const userData = {
              uid:doc.data().uid,
              email:doc.data().email,
              firstname:doc.data().firstname,
              surname:doc.data().surname,
              country:doc.data().country,
              province:doc.data().province,
              role:doc.data().role,
              sex:doc.data().sex
            };
            setUser(userData);
          }
      })
      }else{
        setUser(null);
      }
     
  });return () =>{
authUnsubscribe();
  };
  },[]);
console.log(user)
return (
  <Router>
    <usercontext.Provider value={ {user,setUser}}>
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/post/history" exact>
        <History />
      </Route>
      <Route path="/post/create" exact>
        <Createpost />
      </Route>
      <Route path="/post/edit/:uid" exact>
        <Editpost />
      </Route>
      <Route path="/post/:uid" exact>
        <Post />
      </Route>
      <Route path="/ranking" exact>
        <Rank />
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/signup" exact>
        <Signup />
      </Route>
      <Route path="/forgetpass" exact>
        <Forgetpass />
      </Route>
      <Route path="/prevent" exact>
        <Prevent />
      </Route>
      <Route path="/help" exact>
        <Help />
      </Route>
      <Route path="/contractus" exact>
        <Contractus />
      </Route>
      <Route path="/mypost/:uid" exact>
        <Mypost />
      </Route>
      <Route path="/post" exact>
        <Post />
      </Route>
     
     
    </Switch>
    </usercontext.Provider>
  </Router>
);

}
export default App;