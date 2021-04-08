import React, { useState } from "react";
import { Form, FormGroup, Input, Label, Col, Button } from "reactstrap";
import Navigation from "../components/Navigation";

/**
 * Login page
 */

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <Navigation />
      <div className="login">
        <h2 className="login__title">Login</h2>
        <Form className="login__form">
          <FormGroup>
            <Label className="login__label">Email</Label>
            <Input
              id="email"
              className="login__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Enter Email"
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label className="login__label">Password</Label>
            <Input
              id="password"
              className="login__input"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter password"
            />
          </FormGroup>
          <Button id="submit" size="lg" className="login__submit">
            Submit
          </Button>
          <div className="login__signup">
            Not a Member?
            <a href="/signup">
              <span className="login__signup-text">Signup here</span>
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
