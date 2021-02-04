import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function SubmitQuantityModal(props) {
  const show = props.show;
  const setShow = props.setShow;
  const medName = props.medName;
  const medID = props.medID;
  const finishButtonInput = props.finishButtonInput;
  const [quantity, setQuantity] = useState(1);

  function handleClose() {
    finishButtonInput({ medication: medID, quantity: quantity });
  }

  return (
    <Modal animation={false} show={show} onHide={() => setShow(false)}>
      <Modal.Header>
        <Modal.Title>Please enter a quantity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label htmlFor="quantityFormInput"> {medName}: </Form.Label>
        <Form.Control as="select" onChange={(e) => setQuantity(e.target.value)}>
          {Array.from(Array(10).keys()).map((i) => {
            return (
              <option key={i} value={i + 1}>
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
