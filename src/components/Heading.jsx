import React, { useState } from "react";
import { Button, Navbar, Nav } from "react-bootstrap";
import DownloadDataModal from "./DownloadDataModal";

function Heading() {
  const [showDownloadModal, setShowDownloadMoadal] = useState(false);

  return (
    <>
      <Navbar className='customNav' expand="lg">
        <Navbar.Brand href="#" style={{ margin: "0 2rem" }}>
          <h2 style={{margin: "auto" }}>The Drug Keep</h2>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="custom-navbar"
          style={{ margin: "0 2rem" }}
        />
        <Navbar.Collapse
          id="custom-navbar"
          style={{ padding: "0 2rem", justifyContent: "flex-end" }}
        >
          <Nav.Item>
            <Button
              variant="success"
              onClick={() => setShowDownloadMoadal(true)}
            >
              Download Data
            </Button>
          </Nav.Item>

          {/* <Nav.Item>
            <Nav.Link>Logout</Nav.Link>
          </Nav.Item> */}
        </Navbar.Collapse>
      </Navbar>

      <DownloadDataModal
        show={showDownloadModal}
        setShow={setShowDownloadMoadal}
      />
    </>
  );
}

export default Heading;
