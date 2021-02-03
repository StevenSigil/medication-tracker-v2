import React, { useState } from "react";
import { Modal, Button, FormControl, Form } from "react-bootstrap";

function SubmitQuantityModal(props) {
  const show = props.show;
  const setShow = props.setShow;
  const medName = props.medName;
  const medID = props.medID;
  const addMedication = props.addMedication;
  const [quantity, setQuantity] = useState(1);

  function handleClose() {
    addMedication({ medication: medID, quantity: quantity });
    setShow(false);
  }

  return (
    <Modal animation={false} show={show} onHide={() => setShow(false)}>
      <Modal.Header>
        <Modal.Title>Please enter a quantity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label htmlFor="quantityFormInput"> {medName}: </Form.Label>
        <Form.Control as="select">
          {Array.from(Array(10).keys()).map((i) => {
            return (
              <option
                key={i}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              >
                {" "}
                {i + 1}{" "}
              </option>
            );
          })}
        </Form.Control>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default SubmitQuantityModal;
