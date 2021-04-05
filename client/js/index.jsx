import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../sass/app.scss";
import { store } from "./state/store";
import ReviewPage from "./components/ReviewPage";
import Home from "./components/Home";

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="reviews/:id">
          <ReviewPage />
        </Route>
      </Switch>
    </Router>
  </Provider>
);

render(<App />, document.getElementById("root"));
