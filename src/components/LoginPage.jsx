import React, { useState } from "react";
import axiosInstance from "../util/axios";

import { Button, Card, Form } from "react-bootstrap";

function LoginPage(props) {
  const checkForToken = props.checkForToken;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    axiosInstance
      .post("users/login", { email, password }, { with_credentials: true })
      .then((response) => {
        console.log(response);
        var token = response.data.auth_token;
        sessionStorage.setItem("Token", token);
        checkForToken();
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <Card className="login-card">
        <Card.Header>
          <Card.Title as={"h1"}>Welcome Back</Card.Title>
          <Card.Subtitle>Please sign in</Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                // required
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                // required
                // minLength={4}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default LoginPage;
