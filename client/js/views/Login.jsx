import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Input, Label, Button, Alert } from "reactstrap";
import Navigation from "../components/Navigation";
import { fetchAuth } from "../state/ducks/auth";

/**
 * Login page
 */

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { error } = useSelector((state) => state.auth);

  const handleSubmit = () => {
    dispatch(
      fetchAuth(
        "/api/user/login",
        "POST",
        { password, email },
        "LOGIN",
        history
      )
    );
  };

  return (
    <div style={{ height: "100vh" }}>
      <Navigation />
      <div className="form">
        <h2 className="form__title">Login</h2>
        <Form className="form__form">
          <FormGroup>
            <Label className="form__label">Email</Label>
            <Input
              id="email"
              className="form__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Enter Email"
            />
          </FormGroup>
          <FormGroup>
            <Label className="form__label">Password</Label>
            <Input
              id="password"
              className="form__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter password"
            />
          </FormGroup>
          <Button
            id="submit"
            size="lg"
            className="form__submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <div className="form__signup">
            Not a Member?
            <a href="/signup">
              <span className="form__signup-text">Signup here</span>
            </a>
          </div>
        </Form>
        {error && <Alert color="danger">Error in Logging in</Alert>}
      </div>
    </div>
  );
};

export default Login;
