import React, { useState } from "react";
import { Modal, Button, Container } from "react-bootstrap";

import MedDownloadForm from "./medications/MedDownloadForm";
import BPDownloadForm from "./bp/BPDownloadForm";

function DownloadDataModal(props) {
  const show = props.show;
  const setShow = props.setShow;

  const [showButtons, setShowButtons] = useState(true);
  const [formComp, setFormComp] = useState("");

  function handleClick(screen) {
    setFormComp(screen);
    setShowButtons(false);
  }

  function handleClose() {
    setShow(false);
    setFormComp("");
    setShowButtons(true);
  }

  return (
    <>
      <Modal animation={false} show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Download your {formComp} history</Modal.Title>
        </Modal.Header>

        {showButtons ? (
          <>
            <Modal.Body className="doubleButton-body">
              <p>Please select a data-set</p>

              <Container className="doubleButton-container">
                <Button onClick={() => handleClick("medication")}>
                  Medications
                </Button>

                <Button onClick={() => handleClick("bp")}>
                  Blood Pressure
                </Button>
              </Container>
            </Modal.Body>
          </>
        ) : (
          <Modal.Body>
            {formComp === "medication" ? (
              <MedDownloadForm handleClose={handleClose} />
            ) : (
              <BPDownloadForm handleClose={handleClose} />
            )}
          </Modal.Body>
        )}
      </Modal>
    </>
  );
}

export default DownloadDataModal;
