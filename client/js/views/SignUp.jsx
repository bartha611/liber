import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Form, FormGroup, Input, Label, Button, Alert } from "reactstrap";
import Navigation from "../components/Navigation";
import { fetchAuth } from "../state/ducks/auth";

/**
 * SignUp page
 */

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { error } = useSelector((state) => state.auth);

  const handleSubmit = () => {
    if (confirm === password) {
      dispatch(
        fetchAuth(
          "/api/user/register",
          "POST",
          { username, password, email },
          "LOGIN",
          history
        )
      );
    }
  };

  return (
    <div>
      <Navigation />
      <div className="form">
        <h2 className="form__title">Sign-Up</h2>
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
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label className="form__label">Username</Label>
            <Input
              id="email"
              className="form__input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Enter Email"
            ></Input>
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
          <FormGroup>
            <Label className="form__label">Confirm Password</Label>
            <Input
              id="password"
              className="form__input"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
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
            Already a Member?
            <a href="/login">
              <span className="form__signup-text">Login here</span>
            </a>
          </div>
        </Form>
        {error && <Alert color="danger">Error in registering</Alert>}
      </div>
    </div>
  );
};

export default SignUp;
