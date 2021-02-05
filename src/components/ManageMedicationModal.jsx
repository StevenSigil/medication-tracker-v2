import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

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
          {usersMedications.map((med) => {
            return (
              <Button
                className="med-btn"
                style={{ margin: "2px" }}
                key={med.id}
                id={med.id}
                onClick={() => handleClick(med)}
              >
                {med.name} <br />
                {med.strength}
              </Button>
            );
          })}
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
