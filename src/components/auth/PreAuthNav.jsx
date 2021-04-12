import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import "../../public/static/css/main.css";

export default function PreAuthNav() {
  const history = useHistory();

  function handleSelect(eventKey) {
    switch (eventKey) {
      case "login":
        history.push("/login/");
        break;
      case "register":
        history.push("/register/");
        break;

      default:
        console.log("Problem navigating from navbar event!");
    }
  }

  return (
    <>
      <Navbar className="customNav" expand="lg">
        <Navbar.Brand onClick={() => handleSelect("login")} as={Nav.Link}>
          <h2>The Drug Keep</h2>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="custom-navbar" />

        <Navbar.Collapse id="custom-navbar" className="innerNav-collapse">
          <Nav onSelect={handleSelect}>
            <Nav.Link eventKey="login">Login</Nav.Link>
            <Nav.Link eventKey="register">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
