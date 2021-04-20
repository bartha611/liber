import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../sass/app.scss";
import { store, persistor } from "./state/store";
import ReviewPage from "./views/ReviewPage";
import BookPage from "./views/BookPage";
import Home from "./views/Home";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import ReviewForm from "./components/ReviewForm";

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
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
          <Route path="/review/:bookId">
            <ReviewForm />
          </Route>
        </Switch>
      </Router>
    </PersistGate>
  </Provider>
);

render(<App />, document.getElementById("root"));
