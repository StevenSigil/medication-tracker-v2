import React, { useState, useEffect } from "react";
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
import History from "./History";

function Main() {
  const [showCreateMedModal, setShowCreateMedModal] = useState(false);

  const [dateTime, setDateTime] = useState(getDateTime());

  function getDateTime() {
    const now = new Date();
    const offsetMs = now.getTimezoneOffset() * 60 * 1000;
    const dateLocal = new Date(now.getTime() - offsetMs);
    const str = dateLocal
      .toISOString()
      .slice(0, 19)
      // .replace(/-/g, "/")
      .replace("T", " ");
    return str;
  }

  const formDateTime = getDateTime();
  const [formDate, setFormDate] = useState(formDateTime.slice(0, 10));
  const [formTime, setFormTime] = useState(formDateTime.slice(11, 16));

  let submitData = {};
  let submitMedications = [];
  // {"medication_quantities": [{"medication": UUID, "quantity": int},...], "time_taken": datetime.datetime}

  function addMedication(medAndQuantity) {
    // Adds or removes the medication and quantity object from submitMedications (arr)
    if (
      submitMedications.some(
        (obj) => obj.medication === medAndQuantity.medication
      )
    ) {
      submitMedications.pop(medAndQuantity);
    } else {
      submitMedications.push(medAndQuantity);
    }
  }

  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  function addTimeTaken(dT) {
    // Convers the dateTime param from "yyy-mm-dd hh:mm:ss" to "yyyy-mm-ddThh:mm:sss.mmm(tz)"
    dT = dT.replace(" ", "T");
    dT = new Date().toISOString(dT);
    submitData.time_taken = dT;

    if (submitMedications.length > 0) {
      setButtonsDisabled(true);
      // SHOW CONFIRM SUBMIT FORM HERE!
      submitData.medication_quantities = submitMedications;
    }
  }

  function resetSubmitData() {
    setButtonsDisabled(false);
    submitData = {};
    submitMedications = [];
  }

  return (
    <>
      <div className="main">
        <Container fluid className="main-head">
          <h1>The Drug Keep</h1>
        </Container>

        <Row className="main-row">
          {/* LEFT COLUMN */}
          <Col md={12} lg={4}>
            <div>
              <UsersMedications
                addMedication={addMedication}
                showCreateMedModal={showCreateMedModal}
                setShowCreateMedModal={setShowCreateMedModal}
                buttonsDisabled={buttonsDisabled}
              />

              <Container className="addMed-container">
                <Button
                  disabled={buttonsDisabled}
                  variant="outline-danger"
                  onClick={() => setShowCreateMedModal(true)}
                >
                  Add Medication
                </Button>
              </Container>
            </div>
          </Col>

          {/* MIDDLE COLUMN */}
          <Col md={12} lg={4} className="middle-col">
            <h4>Enter a Date and Time</h4>
            <Container>
              {/* <Row noGutters className="current-time-btn">
                <Button
                  size="lg"
                  variant="success"
                  onClick={() => addTimeTaken(dateTime)}
                >
                  Click to use current time
                </Button>
              </Row> */}

              {/* <Row noGutters style={{ padding: "2rem", color: "#dc3545" }}>
                <h5>OR</h5>
              </Row> */}

              <Row noGutters>
                <InputGroup size="lg">
                  <InputGroup.Prepend>
                    <InputGroup.Text
                      className="dateTime-input1"
                      id="date-input1"
                    >
                      Date
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    type="date"
                    className="dateTime-input"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    aria-label="Date"
                    aria-describedby="date-input1"
                  />
                </InputGroup>

                <InputGroup size="lg">
                  <InputGroup.Prepend>
                    <InputGroup.Text
                      className="dateTime-input1"
                      id="Time-input1"
                    >
                      Time
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    type="time"
                    className="dateTime-input"
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    aria-label="Time"
                    aria-describedby="Time-input1"
                  />
                </InputGroup>
              </Row>
              <Row noGutters className="current-time-btn">
                <Button
                  disabled={buttonsDisabled}
                  size="lg"
                  variant="outline-success"
                  onClick={() => addTimeTaken(formDate, formTime)}
                >
                  Click to use custom time
                </Button>
              </Row>

              {buttonsDisabled ? <Button onClick={resetSubmitData}>Reset</Button> : null}
            </Container>
          </Col>

          {/* RIGHT COLUMN */}
          <Col md={12} lg={4}>
            <Container>
              <History />
            </Container>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Main;
