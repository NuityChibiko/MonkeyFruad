// import package and file
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { auth } from "./user/Frontfirebase";
import Home from "./user/pages/index";
import Contractus from "./user/pages/contractus";
import Createpost from "./user/pages/createpost";
import Login from "./user/pages/login";
import Post from "./user/pages/post";
import Forgetpass from "./user/pages/forgetpass";
import Signup from "./user/pages/signup";
import Prevent from "./user/pages/prevent";
import Helpnew from "./user/pages/helpnew";
import Rank from "./user/pages/ranking";
import Editpost from "./user/pages/editpost";
import History from "./user/pages/history";
import Mypost from "./user/pages/mypost";
import Linkruleshow from "./user/pages/linkruleshow";
<<<<<<< HEAD
import "./app.css";
import Axios from "axios"
import usercontext from "./user/context/usercontext"
import 'bootstrap/dist/css/bootstrap.min.css';
=======
import Profile from "./user/pages/profile";

import HomeAdmin from "./admin/pages/index";
import ContractusAdmin  from "./admin/pages/contractus";
import Managepost from "./admin/pages/managepost";
import Non_verifypost from "./admin/pages/non_verifypost";
import Verifypost from "./admin/pages/verifypost";
>>>>>>> a67be94ee10065a8691fb6a6c83b3b0fcdfd4f2c

import "./app.css";
import usercontext from "./user/context/usercontext";

// ที่รวม Routh ต่างๆ
const App = () => {
  const [user, setUser] = useState();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [admin,setAdmin] = useState(false)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        if(user.uid === "Q8YgWOHIlAeCY0TF8jZK21VL7Hb2"){
          setAdmin(true)
          setLoadingAuth(false);
        }
        setUser(user);
      } else {
        setUser(null);
      }
      setLoadingAuth(false);
    });
  }, []);
  console.log(user);

  return loadingAuth ? (
    ""
  ) : (admin ? (
    <Router>
    <usercontext.Provider value={{ user, setUser }}>
      <Switch>
        <Route path="/" exact>
          <HomeAdmin />
        </Route>
        <Route path="/managepost" exact>
          <Managepost />
        </Route>
        <Route path="/non_verifypost" exact>
          <Non_verifypost />
        </Route>
        <Route path="/verifypost" exact>
          <Verifypost />
        </Route>
        <Route path="/contractus" exact>
          <ContractusAdmin />
        </Route>
      </Switch>
    </usercontext.Provider>
  </Router>
  ) : (
    <Router>
      <usercontext.Provider value={{ user, setUser }}>
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
            <Helpnew />
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
          <Route path="/linkruleshow" exact>
            {user ? 
              <Linkruleshow /> : 
              <Redirect
                to={{
                  pathname: '/login',
                  search: '?login = false',  // query string
                  state: {  // location state
                  login: false, 
                }}}
                />
              }
          </Route>
         <Route path="/profile" exact>
            <Profile />
          </Route>
        </Switch>
      </usercontext.Provider>
    </Router>
  ) )
};
export default App;
