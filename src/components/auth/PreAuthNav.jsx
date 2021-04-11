import React from "react";
import { Navbar, Nav } from "react-bootstrap";

export default function PreAuthNav() {
  return (
    <>
      <Navbar className="preAuthNavbar">
        <Navbar.Brand href="/login/">
          <h2>The Drug Keep</h2>
        </Navbar.Brand>

        <Nav className="navLinkContainer">
          <Nav.Item>
            <Nav.Link href="/login/">Login</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/register/">Register</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    </>
  );
}
