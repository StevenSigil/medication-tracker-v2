import React, { useState } from "react";
import axiosInstance from "../../util/axios";
import { Card, Form, Button, Col } from "react-bootstrap";
import { useHistory } from "react-router";

import PreAuthNav from "./PreAuthNav";
import Footer from "../Footer";

function RegistrationPage(props) {
  const checkForToken = props.checkForToken;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [errMsg, setErrMsg] = useState({
    email: null,
    password: null,
  });

  const history = useHistory();

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
        // console.log(response);
        var token = response.data.auth_token;

        if (token) {
          sessionStorage.setItem("Token", token);
          checkForToken();
          history.push("/main/");
        }
      })
      .catch((error) => {
        // console.log(error.response);
        handleErrMsg(error.response.data);
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

  function PasswordHelpText() {
    return (
      <div className="password-help">
        <p>Password must meet the following requirements:</p>{" "}
        <ul>
          <li>Longer than 8 characters</li>{" "}
          <li>Contain 1 or more special characters</li>
          <li>Include at least 1 number and 1 letter</li>
        </ul>
      </div>
    );
  }

  const emailStyleParams =
    email.length > 0
      ? errMsg.email || !email.includes("@" && ".")
        ? "is-invalid"
        : "is-valid"
      : null;

  const passwordStyleParams =
    password.length > 0
      ? errMsg.password || password.length < 8
        ? "is-invalid"
        : "is-valid"
      : null;

  return (
    <>
      <PreAuthNav />

      <div className="loginMainDiv">
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
              <Card.Title as={"h1"}>Register now</Card.Title>
              <Card.Subtitle>Enter your details below</Card.Subtitle>
            </Card.Header>

            <Card.Body>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="formRegisterEmail">
                  <Form.Label>Your email address</Form.Label>
                  <Form.Control
                    className={emailStyleParams}
                    type="email"
                    placeholder="Email"
                    autoComplete="new-username"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrMsg((prev) => {
                        return { ...prev, email: null };
                      });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errMsg.email
                      ? errMsg.email
                      : "Please enter a valid email address"}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formRegisterPassword">
                  <Form.Label>Your desired password</Form.Label>
                  <Form.Control
                    className={passwordStyleParams}
                    type="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrMsg((prev) => {
                        return { ...prev, password: null };
                      });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {password.length > 8 ? (
                      errMsg.password
                    ) : (
                      <PasswordHelpText />
                    )}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formRegisterFirstName">
                  <Form.Label>Your first name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="First name"
                    autoComplete="first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formRegisterLastName">
                  <Form.Label>Your last name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Last name"
                    autoComplete="last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
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
          </Card>
        </Col>

        <Footer />
      </div>
    </>
  );
}

export default RegistrationPage;
