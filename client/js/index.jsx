import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../sass/app.scss";
import Home from "./components/Home";
import { store } from "./state/store";

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  </Provider>
);

render(<App />, document.getElementById("root"));
