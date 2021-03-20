import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import Following from "./pages/Following";

import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/following">
            <Following />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
