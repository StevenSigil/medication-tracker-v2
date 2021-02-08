import React, { useState } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";

import axiosInstance from "../../util/axios";

function CreateMedModal(props) {
  const show = props.show;
  const setShow = props.setShow;

  const [inputData, setInputData] = useState({
    name: "",
    strength: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setInputData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function prepData(name, strength) {
    // Prepares the data before sending to backend.
    name = name.toLowerCase();
    strength = strength.toLowerCase();
    const data = { name, strength };
    return data;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const data = prepData(inputData.name, inputData.strength);
    axiosInstance
      .post("medications/new_medication/", data)
      .then((response) => {
        console.log(response);
        resetModal();
      })
      .catch((error) => console.log(error));
  }

  function resetModal() {
    // Closes the modal, resets the input, and refreshes the list of users medications
    setShow(false);
    setInputData({ name: "", strength: "" });
    props.getUsersMedications();
  }

  return (
    <>
      <Modal
        animation={false}
        show={show}
        onHide={resetModal}
        className="createMedModal"
      >
        <Modal.Header>
          <Modal.Title>Add a medication</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="createModalName">
              <Form.Control
                type="text"
                placeholder="Enter the medication name"
                name="name"
                value={inputData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="createModalStrength">
              <Form.Control
                type="text"
                placeholder="Enter the medication strength"
                name="strength"
                value={inputData.strength}
                onChange={handleChange}
              />
            </Form.Group>
            <Container className="btn-container">
              <Button variant="outline-secondary" onClick={resetModal}>
                Cancel
              </Button>
              <Button variant="success" type="submit">
                Submit
              </Button>
            </Container>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateMedModal;
