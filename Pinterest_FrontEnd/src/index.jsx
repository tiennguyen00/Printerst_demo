import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.scss";
import App from "./App";
import { Loading } from "./components/loading/Loading";
import { Register } from "./pages/Register/Register";
import { Login } from "./pages/Login/Login";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword";

import ScrollToTop from "./components/scroll/ScrollView";

ReactDOM.render(
  <Router>
    <Switch>
      <ScrollToTop>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/forgotpassword" component={ForgotPassword} />

        <Route path="*" component={App} />
      </ScrollToTop>
    </Switch>
    <Loading />
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
