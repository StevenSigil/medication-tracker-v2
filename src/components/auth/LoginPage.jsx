import React, { useState } from "react";
import axiosInstance from "../../util/axios";

import { Button, Card, Form, Col, Container } from "react-bootstrap";

function LoginPage(props) {
  const checkForToken = props.checkForToken;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState({
    email: null,
    password: null,
  });

  function handleSubmit(e) {
    e.preventDefault();

    axiosInstance
      .post("users/login", { email, password }, { with_credentials: true })
      .then((response) => {
        // console.log(response);
        var token = response.data.auth_token;
        sessionStorage.setItem("Token", token);
        checkForToken();
      })
      .catch((error) => {
        // console.log(error);
        if (error.response) {
          handleErrMsg(error.response.data);
        }
      });
  }

  function handleErrMsg(responseData) {
    if (responseData.email) {
      setErrMsg((prev) => {
        return { ...prev, email: responseData.email[0] };
      });
    }
    if (responseData.password) {
      setErrMsg((prev) => {
        return { ...prev, password: responseData.password[0] };
      });
    }
  }

  function goToRegisterPage() {
    return (window.location = "/register/");
  }

  return (
    <>
      <Col
        xs={10}
        sm={8}
        md={6}
        lg={5}
        xl={4}
        style={{ margin: "auto", marginTop: "2rem", marginBottom: "2rem" }}
      >
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
                  className={errMsg.email ? "is-invalid" : null}
                  type="email"
                  placeholder="Email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  {errMsg.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className={errMsg.password ? "is-invalid" : null}
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  {errMsg.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>

          <Card.Body className="register-body">
            <Container className="register-container">
              <Card.Title>Not registered?</Card.Title>
              <Card.Title>
                <Button onClick={goToRegisterPage}>Register</Button>
              </Card.Title>
            </Container>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}

export default LoginPage;
