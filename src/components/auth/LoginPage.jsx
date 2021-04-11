import React, { useState } from "react";
import axiosInstance from "../../util/axios";

import { Button, Card, Form, Col } from "react-bootstrap";
import { useHistory } from "react-router";

import PreAuthNav from "./PreAuthNav";
import Footer from "../Footer";

function LoginPage(props) {
  // const history = props.history;
  const checkForToken = props.checkForToken;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState({
    email: null,
    password: null,
  });

  const history = useHistory();

  function handleSubmit(e, demo) {
    if (e) e.preventDefault();

    const submitData = demo ? demo : { email, password };

    axiosInstance
      .post("users/login", submitData, { with_credentials: true })
      .then((response) => {
        // console.log(response);
        var token = response.data.auth_token;

        if (token) {
          sessionStorage.setItem("Token", token);
          checkForToken();
          history.push("/main/");
        }
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
    history.push("/register/");
  }

  function loginAsDemo() {
    const data = { email: "demo@example.com", password: "1234$abcd" };
    handleSubmit(null, data);
  }

  return (
    <>
      <PreAuthNav />

      <div className='loginMainDiv'>
        <Col xs={10} sm={8} md={6} lg={5} xl={4} className="loginCol">
          <Card className="login-card">
            <Card.Header>
              <Card.Title as={"h1"}>Welcome Back</Card.Title>
              <Card.Subtitle>Please sign in</Card.Subtitle>
            </Card.Header>

            <Card.Body className="cardBody-form">
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

                <Button
                  className="authSubmit-button"
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </Card.Body>

            <Card.Footer className="register-body">
              <Col xs={12} lg={6} className="register-container">
                <Card.Title>Not registered?</Card.Title>
                <Card.Title>
                  <Button onClick={goToRegisterPage}>Register</Button>
                </Card.Title>
              </Col>

              <Col xs={12} lg={6} className="register-container">
                <Card.Title>Here for a Demo?</Card.Title>
                <Card.Title>
                  <Button onClick={loginAsDemo}>Demo</Button>
                </Card.Title>
              </Col>
            </Card.Footer>
          </Card>
        </Col>

        <Footer />
      </div>
    </>
  );
}

export default LoginPage;
