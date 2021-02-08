import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import "../public/css/main.css";

import BPForm from "./bp/BPForm";
import TimeInput from "./TimeInput";
import BPHistory from "./bp/BPHistory";
import BPSubmitModal from "./bp/BPSubmitModal";

import axiosInstance from "../util/axios";

function BPMain() {
  const [disabledButton, setDisabledButton] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [getHistory, setGetHistory] = useState(false);

  const [inputData, setInputData] = useState({
    sys: "",
    dia: "",
    pulse: "",
    note: "",
  });

  function confirmData(dateTime) {
    setInputData((prev) => {
      return {
        ...prev,
        date_time: dateTime,
      };
    });
    setShowConfirmation(true);
  }

  function addTimeTaken(dT) {
    // Converts the dateTime param from "yyy-mm-dd hh:mm:ss" to "yyyy-mm-ddThh:mm:sss.mmm(tz)"
    // and adds it to 'submitData'. Confirmation Modal then will show.
    dT = dT.replace(" ", "T");
    dT = new Date(dT).toISOString();
    confirmData(dT);
  }

  function handleSend() {
    // Makes sure the Token header is set (CORS problems), then sends the data to backend API.
    axiosInstance
      .post("bp/get_post_bp_logs/", inputData)
      .then((response) => {
        // console.log(response);
        resetData();
        setGetHistory(true);
      })
      .catch((error) => console.log(error));
  }

  function resetData() {
    setInputData({
      sys: "",
      dia: "",
      pulse: "",
      note: "",
    });
    setDisabledButton(true);
  }

  return (
    <>
      <div className="main">
        <Row className="main-row">
          {/* LEFT COLUMN */}
          <Col md={12} lg={5} className="usersMeds">
            <div className="usersMeds-div">
              <Container>
                <h2>Add a new blood pressure reading</h2>

                <BPForm
                  inputData={inputData}
                  setInputData={setInputData}
                  setDisabledButton={setDisabledButton}
                />

                <h2>Confirm the date and time taken</h2>
                <TimeInput
                  addTimeTaken={addTimeTaken}
                  disabledButton={disabledButton}
                />
              </Container>
            </div>
          </Col>

          {/* RIGHT COLUMN */}
          <Col md={12} lg={5}>
            <div className="history-col">
              <BPHistory getData={getHistory} setGetData={setGetHistory} />
            </div>
          </Col>
        </Row>
      </div>

      <BPSubmitModal
        show={showConfirmation}
        setShow={setShowConfirmation}
        items={inputData}
        sendLog={handleSend}
      />
    </>
  );
}

export default BPMain;
