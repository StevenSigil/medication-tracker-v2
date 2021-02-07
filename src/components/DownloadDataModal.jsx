import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axiosInstance from "../util/axios";

import MedDownloadForm from "./medications/MedDownloadForm";
import BPDownloadForm from "./bp/BPDownloadForm";

function DownloadDataModal(props) {
  const show = props.show;
  const setShow = props.setShow;

  const currentDate = new Date().toISOString().slice(0, 10);

  const [showButtons, setShowButtons] = useState(true);
  const [formComp, setFormComp] = useState("");

  function handleClick(screen) {
    setFormComp(screen);
    setShowButtons(false);
  }

  function Forms() {
    return formComp === "med" ? <MedDownloadForm /> : <BPDownloadForm />;
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
          <Modal.Title>Download your history</Modal.Title>
        </Modal.Header>

        {showButtons ? (
          <>
            <Modal.Body>
              <Button onClick={() => handleClick("med")}>Medications</Button>
              <Button onClick={() => handleClick("bp")}>Blood Pressure</Button>
            </Modal.Body>
          </>
        ) : (
          <Modal.Body>
            <Forms />
          </Modal.Body>
        )}
      </Modal>
    </>
  );
}

export default DownloadDataModal;
