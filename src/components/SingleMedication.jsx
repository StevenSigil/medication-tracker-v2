import React, { useState, useEffect } from "react";
import { Button, Col } from "react-bootstrap";
import SubmitQuantityModal from "./SubmitQuantityModal";

function SingleMedication(props) {
  const med = props.medication;
  const addMedication = props.addMedication;
  const setConfirmButtonDisabled = props.setDisabledButton;
  const resetSignal = props.resetSignal;
  const setResetSignal = props.setResetSignal;
  const [disabledButton, setDisabledButton] = useState(false);
  const [showQuantityModal, setShowQuantityModal] = useState(false);

  function handleClick() {
    setShowQuantityModal(true);
    setDisabledButton(true);
    setConfirmButtonDisabled(false);
  }

  function finishButtonInput(obj) {
    addMedication(obj);
    setShowQuantityModal(false);
  }

  useEffect(() => {
    if (resetSignal === true) {
      setDisabledButton(false);
    }
    return () => {
      setResetSignal(false);
    };
  }, [resetSignal, setResetSignal]);

  return (
    <Col xs={6} sm={4} md={3} lg={6} xl={4} className="med-col">
      <Button
        disabled={disabledButton}
        variant={disabledButton ? "outline-secondary" : "secondary"}
        className="med-btn"
        onClick={handleClick}
      >
        {med.name} <br />
        {med.strength}
      </Button>

      <SubmitQuantityModal
        show={showQuantityModal}
        setShow={setShowQuantityModal}
        medName={med.name}
        medID={med.id}
        finishButtonInput={finishButtonInput}
      />
    </Col>
  );
}

export default SingleMedication;
