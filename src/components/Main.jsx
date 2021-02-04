import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../public/css/main.css";

import UsersMedications from "./UsersMedications";
import TimeInput from "./TimeInput";
import ConfirmationForm from "./ConfirmationForm";
import History from "./History";
import axiosInstance from "../util/axios";

function Main() {
  const [usersMedications, setUsersMedications] = useState([]);
  const [showConfirmLogModal, setShowConfirmLogModal] = useState(false);
  const [confirmItems, setConfirmItems] = useState([]);
  const [getHistory, setGetHistory] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);

  const [submitData, setSubmitData] = useState({});

  var submitMedications = [];

  // {"medication_quantities": [{"medication": UUID, "quantity": int},...], "time_taken": datetime.datetime}

  function addMedication(medAndQuantity) {
    // Adds the medication and quantity object from submitMedications (arr)
    if (medAndQuantity) {
      submitMedications.push(medAndQuantity);
      console.log(submitMedications);
    }
  }

  function addTimeTaken(dT) {
    // Convers the dateTime param from "yyy-mm-dd hh:mm:ss" to "yyyy-mm-ddThh:mm:sss.mmm(tz)"
    // and adds it to 'submitData', if submitdata is OK, Confirmation Modal should appear.
    dT = dT.replace(" ", "T");
    console.log(dT);
    dT = new Date(dT).toISOString();
    setSubmitData({ time_taken: dT, medication_quantities: submitMedications });

    PrepConfirmationForm(dT);
    setShowConfirmLogModal(true);
  }

  function PrepConfirmationForm(dateTime) {
    const displayList = submitMedications.map((mq) => {
      usersMedications.forEach((med) => {
        if (med.id === mq.medication) {
          mq.name = med.name;
          mq.strength = med.strength;
        }
      });
      return mq;
    });
    displayList.push(dateTime);
    setConfirmItems(displayList);
  }

  function sendLog() {
    if (submitData) {
      console.log(submitData);

      axiosInstance
        .post("logs/create_log/", submitData)
        .then((response) => {
          console.log(response);
          setGetHistory(true);
        })
        .catch((error) => console.log(error));

      resetSubmitData();
    }
  }

  const [resetSignal, setResetSignal] = useState(false);
  function resetSubmitData() {
    setConfirmItems([]);
    setSubmitData({});
    setDisabledButton(true);
    setResetSignal(true);
    submitMedications.fill(null, 0);
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
                usersMedications={usersMedications}
                setUsersMedications={setUsersMedications}
                resetSignal={resetSignal}
                setResetSignal={setResetSignal}
                setDisabledButton={setDisabledButton}
              />
            </div>
          </Col>

          {/* MIDDLE COLUMN */}
          <Col md={12} lg={4} className="middle-col">
            <h4>Confirm the date and time taken</h4>

            <Container>
              <TimeInput
                addTimeTaken={addTimeTaken}
                disabledButton={disabledButton}
              />
              <Row noGutters className="current-time-btn">
                <Button variant="outline-danger" onClick={resetSubmitData}>
                  Start over
                </Button>
              </Row>
            </Container>

            {confirmItems ? (
              <ConfirmationForm
                confirmationItems={confirmItems}
                dateTime={confirmItems.slice(-1)}
                show={showConfirmLogModal}
                setShow={setShowConfirmLogModal}
                sendLog={sendLog}
              />
            ) : null}
          </Col>

          {/* RIGHT COLUMN */}
          <Col md={12} lg={4}>
            <Container>
              <History getData={getHistory} setGetData={setGetHistory} />
            </Container>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Main;
