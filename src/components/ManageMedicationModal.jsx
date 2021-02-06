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
    setMedicationsClicked((prev) => {
      return [...prev, medication];
    });
    document.getElementById(medication.id).disabled = true;
    document.getElementById(medication.id).classList =
      "med-btn btn btn-primary";
  }

  function handleContinue() {
    setShowRemoveModal(true);
    setShow(false);
  }

  function resetChoices() {
    medicationsClicked.forEach((med) => {
      var medID = med.id;
      document.getElementById(medID).disabled = false;
    });
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
          <Button variant="warning" onClick={resetChoices}>
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
        selection={medicationsClicked}
        getUsersMedications={props.getUsersMedications}
      />
    </>
  );
}

export default ManageMedicationModal;
