import React, { useState } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import axiosInstance from "../util/axios";

function CreateMedModal(props) {
  const show = props.show;
  const setShow = props.setShow;

  const [name, setName] = useState("");

  function handleChange(e) {
    // Seperate function incase client wants more than one input.
    setName(e.target.value);
  }

  function handleSubmit(e) {
    // TODO: Sends a post request to create a 'medication' instance.
    e.preventDefault();
    console.log("submit");

    // axiosInstance
    //   .post('url', name)
    //   .then(response => {
    //     console.log(response);
    //     resetModal();
    //   })
    //   .catch(error => console.log(error))
  }

  function resetModal() {
    // Closes the modal and resets the input
    setShow(false);
    setName("");
  }

  return (
    <>
      <Modal show={show} onHide={resetModal} className="createMedModal">
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
