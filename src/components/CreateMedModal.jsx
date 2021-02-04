import React, { useState } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import axiosInstance from "../util/axios";

function CreateMedModal(props) {
  const show = props.show;
  const setShow = props.setShow;

  const [name, setName] = useState("");
  const [strength, setStrength] = useState("");

  function prepData(name, strength) {
    var data = {};
    name = name.toLowerCase();
    console.log(name);
    strength = strength.toLowerCase();
    console.log(strength);
    data.name = name;
    data.strength = strength;
    return data;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = prepData(name, strength);

    axiosInstance
      .post("medications/new_medication/", data)
      .then((response) => {
        console.log(response);
        resetModal();
      })
      .catch((error) => console.log(error));
  }

  function resetModal() {
    // Closes the modal, resets the input and refreshes the list of users medications
    setShow(false);
    setName("");
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="createModalStrength">
              <Form.Control
                type="text"
                placeholder="Enter the medication strength"
                value={strength}
                onChange={(e) => setStrength(e.target.value)}
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
