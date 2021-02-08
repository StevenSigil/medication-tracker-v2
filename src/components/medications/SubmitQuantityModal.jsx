import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function SubmitQuantityModal(props) {
  const show = props.show;
  const setShow = props.setShow;

  const medID = props.medID;
  const medName = props.medName;

  const setResetSignal = props.setResetSignal;
  const finishButtonInput = props.finishButtonInput;
  const [quantity, setQuantity] = useState(false);

  function handleSubmit() {
    finishButtonInput({ medication: medID, quantity: quantity });
  }

  function handleCancel() {
    setResetSignal(true);
    setQuantity(false);
    setShow(false);
  }

  return (
    <Modal animation={false} show={show} onHide={handleCancel}>
      <Modal.Header>
        <Modal.Title>Please enter a quantity</Modal.Title>
      </Modal.Header>

      <Modal.Header style={{ paddingBottom: 0 }}>
        <Modal.Title as="h5">
          {medName}: {quantity}{" "}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {Array.from(Array(4).keys()).map((n) => {
          return (
            <Button
              className="med-btn"
              disabled={quantity === n + 1}
              variant={quantity !== n + 1 ? "outline-primary" : "primary"}
              key={n}
              onClick={() => setQuantity(n + 1)}
            >
              {" "}
              {n + 1}{" "}
            </Button>
          );
        })}
      </Modal.Body>

      <Modal.Body>
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
        <Button onClick={handleSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default SubmitQuantityModal;
