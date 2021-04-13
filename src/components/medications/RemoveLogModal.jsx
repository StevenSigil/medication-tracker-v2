import React from "react";
import { Modal, Container, Col, Button } from "react-bootstrap";
import axiosInstance from "../../util/axios";

export default function RemoveLogModal(props) {
  let { log, setGetHistory, setGetMedications, show, setShow } = props;

  var dateTime = new Date(Date.parse(log.time_taken));
  dateTime = dateTime.toLocaleString().split(", ");

  function handleRemove() {
    axiosInstance
      .post("logs/delete_log/", { id: log.id })
      .then((response) => {
        console.log(response);
        setGetHistory(true);
        setGetMedications(true);
      })
      .catch((error) => console.log(error));
  }

  return (
    <Modal animation={false} show={show} onHide={() => setShow(false)}>
      <Modal.Header>
        <Modal.Title style={{ margin: "auto" }}>Confirm action</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 style={{ marginBottom: "1.5rem" }}>
          Did you want to remove this log entry?
        </h5>

        <Container
          style={{
            padding: "0.5rem",
            border: "1px solid black",
            borderRadius: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-evenly",
              fontWeight: "600",
              fontSize: "1.125em",
            }}
          >
            <p>{dateTime[1]}</p>
            <p>{dateTime[0]}</p>
          </div>

          {log.medication_quantities.map((med) => {
            return (
              <div
                key={med.id}
                style={{
                  display: "flex",
                  textAlign: "center",
                }}
              >
                <Col>
                  <p style={{ borderBottom: "1px solid #aaa" }}>{med.name}</p>
                </Col>
                <Col>
                  <p style={{ borderBottom: "1px solid #aaa" }}>
                    {med.strength}
                  </p>
                </Col>
                <Col>
                  <p style={{ borderBottom: "1px solid #aaa" }}>
                    {med.quantity}
                  </p>
                </Col>
              </div>
            );
          })}
        </Container>
      </Modal.Body>
      <Modal.Body style={{ marginBottom: "16px" }}>
        <h5>Warning!</h5>
        <Container>
          <h6>This action is not reversible. Please confirm now.</h6>
        </Container>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Go back
        </Button>
        <Button onClick={handleRemove} variant="danger">
          Confirm Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
