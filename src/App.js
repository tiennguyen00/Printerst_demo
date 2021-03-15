import { Switch, Route, Redirect } from "react-router";
import Header from "./components/Header";
import Content from "./components/Content";

import "./App.css";

const signUp = () => {};

const signIn = () => {};

const App = () => {
  return (
    <div className="app">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <Content />
      {/* Test connect to backend */}
      <form action="/api" method="post" className="form">
        <button type="submit">Connected?</button>
      </form>
    </div>
  );
};

export default App;
