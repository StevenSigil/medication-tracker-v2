import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import axiosInstance from "../util/axios";
import DownloadDataModal from "./DownloadDataModal";

export default function Heading(props) {
  const setLogin = props.setLogin;
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const history = useHistory();

  const token = sessionStorage.getItem("Token");
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = "Token " + token;
  }

  function handleSelect(eventKey) {
    switch (eventKey) {
      case "main":
        history.push("/main/");
        break;
      case "bp":
        history.push("/bp/");
        break;
      case "download":
        setShowDownloadModal(true);
        break;
      case "logout":
        handleLogout();
        break;

      default:
        history.push("/main");
    }
  }

  function handleLogout() {
    axiosInstance.post("users/logout").then((response) => {
      // console.log(response);
      sessionStorage.removeItem("Token");
      setLogin(false);
      history.push("/login/");
    });
    // .catch((error) => console.log(error));
  }

  return (
    <>
      <Navbar className="customNav" expand="lg">
        <Navbar.Brand onClick={() => handleSelect("main")} as={Nav.Link}>
          <h2>The Drug Keep</h2>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="custom-navbar" />

        <Navbar.Collapse id="custom-navbar" className="innerNav-collapse">
          <Nav onSelect={handleSelect}>
            <Nav.Link eventKey="main">Medications</Nav.Link>
            <Nav.Link eventKey="bp">Blood Pressure</Nav.Link>
            <Nav.Link eventKey="download">Download Data</Nav.Link>
            <Nav.Link eventKey="logout">Logout</Nav.Link>
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
