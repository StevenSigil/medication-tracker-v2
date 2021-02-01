import React from "react";
import { Button, Col } from "react-bootstrap";

function SingleMedication(props) {
  const medication = props.medication;

  return (
    <Col md={6} className="med-col">
      <Button variant='secondary' className='med-btn'>{medication}</Button>
    </Col>
  );
}

export default SingleMedication;
