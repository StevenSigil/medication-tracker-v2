import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function DownloadDataModal(props) {
  const show = props.show;
  const setShow = props.setShow;

  const currentDate = new Date().toISOString().slice(0,10)
  // const formattedDate = currentDate
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(currentDate);

  

  return (
    <>
      <Modal animation={false} show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Download your history</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please select a start and end date to begin</p>
          <Form>
            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                // className="dateTime-input"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                aria-label="Start Date"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                aria-label="End Date"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success">Download</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DownloadDataModal;
