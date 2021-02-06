import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../public/css/main.css";

import Heading from "./Heading";
import UsersMedications from "./UsersMedications";
import TimeInput from "./TimeInput";
import ConfirmationForm from "./ConfirmationForm";
import History from "./History";
import axiosInstance from "../util/axios";

function Main(props) {
  const [usersMedications, setUsersMedications] = useState([]);
  const [showConfirmLogModal, setShowConfirmLogModal] = useState(false);
  const [confirmItems, setConfirmItems] = useState([]);
  const [getHistory, setGetHistory] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);

  const [resetSignal, setResetSignal] = useState(false);

  const [submitData, setSubmitData] = useState({});
  var submitMedications = [];

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
        <Heading setLogin={props.setLogin} />

        <Row className="main-row">
          {/* LEFT COLUMN */}
          <Col md={12} lg={5} className="usersMeds">
            <div className="usersMeds-div">
              <Container>
                <h2>Add a new entry</h2>
                <UsersMedications
                  addMedication={addMedication}
                  usersMedications={usersMedications}
                  setUsersMedications={setUsersMedications}
                  resetSignal={resetSignal}
                  setResetSignal={setResetSignal}
                  setDisabledButton={setDisabledButton}
                />

                <h2>Confirm the date and time taken</h2>
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
            </div>
          </Col>

          {/* RIGHT COLUMN */}
          <Col md={12} lg={5}>
            <div className="history-col">
              <History getData={getHistory} setGetData={setGetHistory} />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Main;
