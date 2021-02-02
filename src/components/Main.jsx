import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "../public/css/main.css";

import UsersMedications from "./UsersMedications";

function Main() {
  const [showCreateMedModal, setShowCreateMedModal] = useState(false);

  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60 * 1000;
  const dateLocal = new Date(now.getTime() - offsetMs);
  const str = dateLocal
    .toISOString()
    .slice(0, 19)
    .replace(/-/g, "/")
    .replace("T", " ");
  const [date, setDate] = useState(str);

  const submitMedications = [];
  function addMedication(medID) {
    if (submitMedications.some((id) => id === medID)) {
      submitMedications.pop(medID);
    } else {
      submitMedications.push(medID);
    }
    console.log(submitMedications);
    return submitMedications;
  }

  console.log(date);

  return (
    <>
      <div className="main">
        <Container fluid className="main-head">
          <h1>The Drug Keep</h1>
        </Container>

        <Row className="main-row">
          <Col md={4}>
            <div>
              <UsersMedications
                addMedication={addMedication}
                showCreateMedModal={showCreateMedModal}
                setShowCreateMedModal={setShowCreateMedModal}
              />

              <Container className="addMed-container">
                <Button
                  variant="outline-danger"
                  onClick={() => setShowCreateMedModal(true)}
                >
                  Add Medication
                </Button>
              </Container>
            </div>
          </Col>

          <Col md={4} className="middle-col">
            <Container>
              <Row noGutters className="current-time-btn">
                <Button size="lg" variant="outline-light">
                  Click to use current time
                </Button>
              </Row>

              <Row noGutters>
                <h5>Enter a time</h5>
                <FormControl
                  size="lg"
                  type="datetime-local"
                  className="dateTime-input"
                  value={date}
                  placeholder={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Row>
            </Container>
          </Col>

          <Col md={4}>
            <Container>
              <p>History log will go here</p>

              <Button variant="outline-danger">Download Data</Button>
            </Container>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Main;
