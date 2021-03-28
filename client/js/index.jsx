import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../sass/app.scss";
import Home from "./components/Home";

const App = () => (
  <Router>
    <Switch>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>
);

render(<App />, document.getElementById("root"));
