import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.scss";
import App from "./App";
import { Loading } from "./components/loading/Loading";
import { Register } from "./pages/Register/Register";
import { Login } from "./pages/Login/Login";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword";
import { Detail } from "./pages/Detail/Detail";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/forgotpassword" component={ForgotPassword} />
      <Route name="detail" path="/detail" component={Detail} />

      <Route path="*" component={App} />
    </Switch>
    <Loading />
  </Router>,
  document.getElementById("root")
);
