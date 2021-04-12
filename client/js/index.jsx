import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../sass/app.scss";
import { store } from "./state/store";
import ReviewPage from "./views/ReviewPage";
import BookPage from "./views/BookPage";
import Home from "./views/Home";
import Login from "./views/Login";
import SignUp from "./views/SignUp";

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/reviews/:id">
          <ReviewPage />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/books/:id">
          <BookPage />
        </Route>
      </Switch>
    </Router>
  </Provider>
);

render(<App />, document.getElementById("root"));
