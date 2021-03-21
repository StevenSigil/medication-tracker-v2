import React, { useState } from "react";
import { InputGroup, FormControl, Button, Row } from "react-bootstrap";
import ISODateTimeToLocalView, {
  localSplitDTStringToISO,
} from "../util/dateTime";

function TimeInput(props) {
  const addTimeTaken = props.addTimeTaken;
  const disabledButton = props.disabledButton;

  const [inputData, setInputData] = useState({
    date: ISODateTimeToLocalView().date,
    time: ISODateTimeToLocalView().time,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInputData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleSubmit() {
    const nonLocalDateTime = localSplitDTStringToISO(
      inputData.date,
      inputData.time
    );
    addTimeTaken(nonLocalDateTime);
  }
  function handleBlockSubmit() {
    alert("Please select at least one medication before submitting.")
  }

  return (
    <>
      <Row noGutters className='timeInput-row'>
        <InputGroup size="lg">
          <InputGroup.Prepend>
            <InputGroup.Text className="dateTime-input1" id="date-input1">
              Date
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="date"
            className="dateTime-input"
            name="date"
            value={inputData.date}
            onChange={handleChange}
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
            name="time"
            value={inputData.time}
            onChange={handleChange}
            aria-label="Time"
            aria-describedby="Time-input1"
          />
        </InputGroup>
      </Row>
      <Row noGutters className="current-time-btn">
        <Button
          // disabled={disabledButton}
          size="lg"
          className={disabledButton ? "btn customDisabledButton" : "btn"}
          variant={disabledButton ? "outline-success" : "success"}
          onClick={disabledButton ? handleBlockSubmit : handleSubmit}
        >
          Confirm this time
        </Button>
      </Row>
    </>
  );
}
export default TimeInput;
