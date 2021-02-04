import React, { useState } from "react";
import { InputGroup, FormControl, Button, Row } from "react-bootstrap";

function TimeInput(props) {
  const addTimeTaken = props.addTimeTaken;
  const disabledButton = props.disabledButton;

  const formDateTime = getDateTime();
  const [formDate, setFormDate] = useState(formDateTime.slice(0, 10));
  const [formTime, setFormTime] = useState(formDateTime.slice(11, 16));

  function getDateTime() {
    const now = new Date();
    const offsetMs = now.getTimezoneOffset() * 60 * 1000;
    const dateLocal = new Date(now.getTime() - offsetMs);
    const str = dateLocal
      .toISOString()
      // .slice(0, 19)
      // .replace(/-/g, "/")
      .replace("T", " ");

    return str;
  }

  function handleSubmit(date, time) {
    var d = null;
    var t = null;
    date !== formDateTime.slice(0, 10) ? (d = date) : (d = formDate);
    time !== formDateTime.slice(11, 16) ? (t = time) : (t = formTime);

    addTimeTaken(d + "T" + t);
  }

  return (
    <>
      <Row noGutters>
        <InputGroup size="lg">
          <InputGroup.Prepend>
            <InputGroup.Text className="dateTime-input1" id="date-input1">
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
            <InputGroup.Text className="dateTime-input1" id="Time-input1">
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
          disabled={disabledButton}
          size="lg"
          variant={disabledButton ? "outline-success" : "success"}
          onClick={() => handleSubmit(formDate, formTime)}
        >
          Confirm this time
        </Button>
      </Row>
    </>
  );
}
export default TimeInput;
