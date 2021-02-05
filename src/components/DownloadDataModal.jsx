import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axiosInstance from "../util/axios";

function DownloadDataModal(props) {
  const show = props.show;
  const setShow = props.setShow;

  const currentDate = new Date().toISOString().slice(0, 10);
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(currentDate);

  function handleSubmit() {
    const data = { start_date: startDate, end_date: endDate };
    axiosInstance
      .post("logs/download_logs/", data, {
        Accept: "text/csv",
        responseType: "blob",
      })
      .then((response) => {
        let blob = new Blob([response.data]);
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute("download", "medication-log.csv");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => console.log(error));
  }

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
                id="download-startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                aria-label="Start Date"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                id="download-endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                aria-label="End Date"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSubmit}>
            Download
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DownloadDataModal;
