import React, { useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";

import RemoveMedicationModal from "./RemoveMedicationModal";

function ManageMedicationModal(props) {
  const usersMedications = props.usersMedications;
  const show = props.show;
  const setShow = props.setShow;
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [medicationsClicked, setMedicationsClicked] = useState([]);

  function handleClick(medication) {
    // Adds the medication to confirmation list and changes button styles
    setMedicationsClicked((prev) => {
      return [...prev, medication];
    });

    document.getElementById(medication.id).disabled = true;
    document.getElementById(medication.id).classList =
      "med-btn btn btn-primary";
  }

  function handleContinue() {
    // Move the user to confirmation modal
    if (medicationsClicked.length < 1) {
      alert("Please select a medication to continue.");
    } else {
      setShowRemoveModal(true);
      setShow(false);
    }
  }

  function resetChoicesAndStyles() {
    medicationsClicked.forEach((med) => {
      var medID = med.id;
      document.getElementById(medID).disabled = false;
      document.getElementById(medID).classList =
        "med-btn btn btn-outline-primary";
    });
    setMedicationsClicked([]);
  }

  function backToThisModal() {
    setShowRemoveModal(false);
    setShow(true);
    setMedicationsClicked([]);
  }

  function resetModal() {
    setShow(false);
    setMedicationsClicked([]);
  }

  return (
    <>
      <Modal animation={false} show={show} onHide={resetModal}>
        <Modal.Header>
          <Modal.Title>Manage your medications</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please select the medication(s) to manage:</p>
          <Row noGutters>
            {usersMedications.map((med) => {
              return (
                <Col
                  xs={6}
                  sm={4}
                  key={med.id}
                  className="med-col"
                  style={{ textAlign: "center" }}
                >
                  <Button
                    hidden={!med.name}
                    className="med-btn"
                    variant="outline-primary"
                    id={med.id}
                    onClick={() => handleClick(med)}
                  >
                    {med.name} <br />
                    {med.strength}
                  </Button>
                </Col>
              );
            })}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetModal}>
            Cancel
          </Button>
          <Button variant="warning" onClick={resetChoicesAndStyles}>
            Reset choices
          </Button>
          <Button variant="success" onClick={handleContinue}>
            Confirm selection
          </Button>
        </Modal.Footer>
      </Modal>

      <RemoveMedicationModal
        show={showRemoveModal}
        setShow={setShowRemoveModal}
        resetModal={resetModal}
        goBack={backToThisModal}
        selection={medicationsClicked}
        getUsersMedications={props.getUsersMedications}
      />
    </>
  );
}

export default ManageMedicationModal;
