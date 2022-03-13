import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../public/static/css/main.css";

import UsersMedications from "./medications/UsersMedications";
import TimeInput from "./TimeInput";
import ConfirmationForm from "./medications/ConfirmationForm";
import MEDHistory from "./medications/MEDHistory";
import Footer from "./Footer";
import axiosInstance from "../util/axios";

export default function MEDMain() {
  const [getHistory, setGetHistory] = useState(false);
  const [getMedications, setGetMedications] = useState(false);

  const [usersMedications, setUsersMedications] = useState([]); // from GET req.
  const [disabledButton, setDisabledButton] = useState(true); // Disables the med btns after selection

  // Confirmation and updating dashboard
  const [showConfirmLogModal, setShowConfirmLogModal] = useState(false);
  const [confirmItems, setConfirmItems] = useState([]);
  const [submitMedications, setSubmitMedications] = useState([]);
  const [submitData, setSubmitData] = useState({});
  const [resetSignal, setResetSignal] = useState(false);

  function addMedication(medAndQuantity) {
    // Adds the medication and quantity object from submitMedications as an array
    setSubmitMedications((prev) => {
      return [...prev, medAndQuantity];
    });
    setDisabledButton(false);
  }

  function addTimeTaken(dT) {
    // Adds the input date/time to 'submitData'. Then shows the Confirmation Modal.
    setSubmitData({ time_taken: dT, medication_quantities: submitMedications });
    PrepConfirmationForm(dT);
    setShowConfirmLogModal(true);
  }

  function PrepConfirmationForm(dateTime) {
    // Adds the name and strength of the medications to each user selected option
    // then the time obj to outer list before submission
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
    axiosInstance
      .post("logs/create_log/", submitData)
      .then((response) => {
        console.log(response);
        setGetMedications(true);
      })
      .catch((error) => console.log(error));

    resetSubmitData();
  }

  function resetSubmitData() {
    setConfirmItems([]);
    setSubmitData({});
    setDisabledButton(true);
    setResetSignal(true);
    setSubmitMedications([]);
  }

  return (
    <>
      <div className="main">
        <Row className="main-row">
          {/* LEFT COLUMN */}
          <Col md={12} lg={5} className="usersMeds">
            <div className="usersMeds-div">
              <Container>
                <h2>Add a new medication entry</h2>
                <UsersMedications
                  addMedication={addMedication}
                  usersMedications={usersMedications}
                  setUsersMedications={setUsersMedications}
                  resetSignal={resetSignal}
                  setResetSignal={setResetSignal}
                  setGetHistory={setGetHistory}
                  getMedications={getMedications}
                  setGetMedications={setGetMedications}
                />

                <h2>Confirm the date and time taken</h2>
                <TimeInput
                  addTimeTaken={addTimeTaken}
                  disabledButton={disabledButton}
                  resetSignal={resetSignal}
                />

                <Row noGutters className="current-time-btn">
                  <Button
                    variant="outline-danger"
                    size="lg"
                    onClick={resetSubmitData}>
                    Clear and Restart
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
            </div>
          </Col>

          {/* RIGHT COLUMN */}
          <Col md={12} lg={5}>
            <div className="history-col">
              <MEDHistory
                getData={getHistory}
                setGetData={setGetHistory}
                setGetMedications={setGetMedications}
              />
            </div>
          </Col>
        </Row>
      </div>

      <Footer />
    </>
  );
}
