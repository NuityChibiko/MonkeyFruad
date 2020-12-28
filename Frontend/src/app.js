// import package

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

//   import Axios from "axios"

// ที่รวม Routh ต่างๆ
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {/* <Index /> */}
        </Route>
      </Switch>
    </Router>
  );
};

// export default App;
