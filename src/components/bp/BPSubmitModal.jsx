import React from "react";
import { Button, Container, ListGroup, Modal } from "react-bootstrap";

function BPSubmitModal(props) {
  const show = props.show;
  const setShow = props.setShow;
  const Items = props.items;
  const sendLog = props.sendLog;

  function handleSubmit() {
    sendLog();
    setShow(false);
  }

  function parseTime(dt) {
    if (dt) {
      const newDateTime = new Date(dt).toLocaleString();
      return newDateTime;
    } else {
      return Date.now();
    }
  }

  return (
    <>
      <Modal animation={false} show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Please confirm your entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup style={{ color: "black" }}>
            <ListGroup.Item style={{ textAlign: "center" }}>
              <div className="h5">{parseTime(Items.date_time)}</div>
            </ListGroup.Item>

            <ListGroup.Item>
              <strong>Systolic:</strong> <Container>{Items.sys}</Container>
            </ListGroup.Item>

            <ListGroup.Item>
              <strong>Diastolic:</strong> <Container>{Items.dia}</Container>
            </ListGroup.Item>

            <ListGroup.Item>
              <strong>Pulse:</strong> <Container>{Items.pulse}</Container>
            </ListGroup.Item>

            <ListGroup.Item>
              <strong>Note:</strong>
              <Container>{Items.note}</Container>
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSubmit}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BPSubmitModal;
