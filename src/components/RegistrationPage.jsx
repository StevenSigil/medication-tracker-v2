import React, { useState } from "react";
import axiosInstance from "../util/axios";
import { Card, Form, Button } from "react-bootstrap";

function RegistrationPage(props) {
  const checkForToken = props.checkForToken;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    };

    axiosInstance
      .post("users/register", data)
      .then((response) => {
        console.log(response);
        checkForToken();
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <Card className="login-card">
        <Card.Header>
          <Card.Title as={"h1"}>Register now</Card.Title>
          <Card.Subtitle>Enter your details below</Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formRegisterEmail">
              <Form.Label>Your email address</Form.Label>
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
            <Form.Group controlId="formRegisterPassword">
              <Form.Label>Your desired password</Form.Label>
              <Form.Control
                // required
                // minLength={4}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formRegisterFirstName">
              <Form.Label>Your first name</Form.Label>
              <Form.Control
                // required
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formRegisterLastName">
              <Form.Label>Your last name</Form.Label>
              <Form.Control
                // required
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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

export default RegistrationPage;
