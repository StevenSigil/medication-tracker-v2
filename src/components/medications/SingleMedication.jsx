import React, { useState, useEffect } from "react";
import { Button, Col } from "react-bootstrap";
import SubmitQuantityModal from "./SubmitQuantityModal";

export default function SingleMedication(props) {
  const med = props.medication;
  const addMedication = props.addMedication;

  const resetSignal = props.resetSignal;
  const setResetSignal = props.setResetSignal;

  const [disabledButton, setDisabledButton] = useState(false);
  const [showQuantityModal, setShowQuantityModal] = useState(false);

  function handleClick() {
    setShowQuantityModal(true);
    setDisabledButton(true);
  }

  function finishButtonInput(obj) {
    addMedication(obj);
    setShowQuantityModal(false);
  }

  useEffect(() => {
    if (resetSignal === true) {
      setDisabledButton(false);
    }
    return () => {
      setResetSignal(false);
    };
  }, [resetSignal, setResetSignal]);

  return (
    <Col xs={6} sm={4} md={3} lg={6} xl={4} className="med-col">
      <Button
        hidden={!med.name}
        disabled={disabledButton}
        variant={disabledButton ? "primary" : "outline-primary"}
        className="med-btn"
        onClick={handleClick}
      >
        <p className="m-0">{med.name}</p>

        <p className="m-0">{med.strength}</p>
      </Button>

      <DateTimeDiff previousTime={`${med.last_time_taken}Z`} />

      <SubmitQuantityModal
        show={showQuantityModal}
        setShow={setShowQuantityModal}
        setResetSignal={setResetSignal}
        medName={med.name}
        medID={med.id}
        finishButtonInput={finishButtonInput}
      />
    </Col>
  );
}

function DateTimeDiff({ previousTime }) {
  previousTime = new Date(previousTime);
  const [diffSec, setDiffSec] = useState(0);
  const [diffHr, setDiffHr] = useState(0);
  const [diffMin, setDiffMin] = useState(0);

  function updateCurrentTime() {
    const newTime = new Date();

    const mS = Math.abs(newTime - previousTime);

    const hr = Math.floor(mS / 1000 / 60 / 60);

    const mins = Math.floor(mS / 1000 / 60);
    const adjMin = mins - hr * 60;

    const secs = Math.floor(mS / 1000);
    const adjSec = secs - mins * 60;

    setDiffHr(hr);
    setDiffMin(adjMin);
    setDiffSec(adjSec);
  }

  setInterval(updateCurrentTime, 1000);

  return (
    <>
      <small title="Time since last taken" className="m-0">
        {diffHr}h : {diffMin}m : {diffSec}s
      </small>
    </>
  );
}
