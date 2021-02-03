import React, { useState } from "react";
import { Button, Col } from "react-bootstrap";
import SubmitQuantityModal from "./SubmitQuantityModal";

function SingleMedication(props) {
  const med = props.medication;
  const buttonsDisabled = props.buttonsDisabled;
  const addMedication = props.addMedication;
  const [showQuantityModal, setShowQuantityModal] = useState(false);

  return (
    <Col xs={6} sm={4} md={3} lg={6} xl={4} className="med-col">
      <Button
        disabled={buttonsDisabled}
        variant="secondary"
        className="med-btn"
        onClick={() => setShowQuantityModal(true)}
      >
        {med.name} <br />
        {med.strength}
      </Button>

      <SubmitQuantityModal
        show={showQuantityModal}
        setShow={setShowQuantityModal}
        medName={med.name}
        medID={med.id}
        addMedication={addMedication}
      />
    </Col>
  );
}

export default SingleMedication;
