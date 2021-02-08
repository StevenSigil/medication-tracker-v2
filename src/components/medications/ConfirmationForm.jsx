import React from "react";
import { Button, ListGroup, Modal } from "react-bootstrap";

function ConfirmationForm(props) {
  const show = props.show;
  const setShow = props.setShow;
  const sendLog = props.sendLog;
  const confirmationItems = props.confirmationItems;

  const dateTime = confirmationItems.slice(-1)[0];

  function handleSubmit() {
    sendLog();
    setShow(false);
  }

  function parseTime(dt) {
    // For viewing purposes only. Content sent to backed adjusted elsewhere
    return new Date(dt).toLocaleString();
  }

  return (
    <>
      <Modal animation={false} show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Please confirm your entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup style={{ color: "black" }}>
            <ListGroup.Item> {parseTime(dateTime)} </ListGroup.Item>

            {confirmationItems.slice(0, -1).map((item) => {
              return (
                <ListGroup.Item key={item.medication}>
                  {item.name} {item.strength} ({item.quantity})
                </ListGroup.Item>
              );
            })}
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

export default ConfirmationForm;
