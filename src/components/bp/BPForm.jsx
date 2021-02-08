import React from "react";
import { Form, Row } from "react-bootstrap";

function BPForm(props) {
  const inputData = props.inputData;
  const setInputData = props.setInputData;
  const setDisabledButton = props.setDisabledButton;

  function handleChange(e) {
    const { value, name } = e.target;

    setInputData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    return checkData();
  }

  function checkData() {
    // Checks for the required data before allowing time input (then submission)
    if (
      inputData.sys.length > 0 &&
      inputData.dia.length > 0 &&
      inputData.pulse.length > 0
    ) {
      setDisabledButton(false);
    }
  }

  return (
    <>
      <Row noGutters className="bpForm-row">
        <Form>
          <Form.Group controlId="CreateBPLog-sys">
            <Form.Label>Systolic (top)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Systolic"
              name="sys"
              value={inputData.sys}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="CreateBPLog-dia">
            <Form.Label>Diastolic (middle)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Diastolic"
              name="dia"
              value={inputData.dia}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="CreateBPLog-pulse">
            <Form.Label>Pulse (bottom)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Pulse"
              name="pulse"
              value={inputData.pulse}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Notes"
              name="note"
              value={inputData.note}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Row>
    </>
  );
}

export default BPForm;
