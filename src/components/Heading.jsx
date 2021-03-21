import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useHistory } from "react-router";

import axiosInstance from "../util/axios";
import DownloadDataModal from "./DownloadDataModal";

function Heading(props) {
  const setLogin = props.setLogin;
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const history = useHistory();

  const token = sessionStorage.getItem("Token");
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = "Token " + token;
  }

  function handleSelect(eventKey) {
    if (eventKey === "download") {
      setShowDownloadModal(true);
    } else if (eventKey === "logout") {
      handleLogout();
    }
  }

  function handleLogout() {
    axiosInstance
      .post("users/logout")
      .then((response) => {
        console.log(response);
        sessionStorage.removeItem("Token");
        setLogin(false);
        history.push("/login/");
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <Navbar sticky="top" className="customNav" expand="lg">
        <Navbar.Brand href="/main/" style={{ margin: "0 2rem" }}>
          <h2 style={{ margin: "auto" }}>The Drug Keep</h2>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="custom-navbar"
          style={{ margin: "0 2rem" }}
        />

        <Navbar.Collapse id="custom-navbar" className="justify-content-end">
          <Nav onSelect={handleSelect}>
            <Nav.Item>
              <Nav.Link href="/main/">Medications</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/bp/">Blood Pressure</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="download">Download Data</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="logout">Logout</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <DownloadDataModal
        show={showDownloadModal}
        setShow={setShowDownloadModal}
      />
    </>
  );
}

export default Heading;
