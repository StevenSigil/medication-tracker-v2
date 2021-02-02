import React from "react";
import { Button, Col, Container } from "react-bootstrap";

function SingleMedication(props) {
  const med = props.medication;
  const addMedication = props.addMedication;

  return (
    <Col md={6} className="med-col">
      <Button
        variant="secondary"
        className="med-btn"
        onClick={() => addMedication(med.id)}
      >
        {med.name} <br />
        {med.strength}
      </Button>
    </Col>
  );
}

export default SingleMedication;
