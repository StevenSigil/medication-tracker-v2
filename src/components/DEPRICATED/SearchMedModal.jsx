import React, { useState } from "react";
import { Modal, Button, Form, Container, Col, Card } from "react-bootstrap";
import axiosInstance from "../../util/axios";

function SearchMedModal(props) {
  const show = props.show;
  const setShow = props.setShow;
  const getUsersMedications = props.getUsersMedications;
  const setShowCreateMedModal = props.setShowCreateMedModal;
  const [inputText, setInputText] = useState("");
  const [medications, setMedications] = useState(null);

  function handleChange(searchText) {
    setInputText(searchText);

    if (searchText !== "") {
      axiosInstance
        .get("medications/search/?search=" + searchText)
        .then((response) => {
          console.log(response);
          setMedications(response.data);
        })
        .catch((error) => console.log(error));
    }
  }

  function handleAdd(medID) {
    axiosInstance
      .post("medications/medication_to_user/", { id: medID })
      .then((response) => {
        console.log(response);
        resetModal();
        getUsersMedications();
      })
      .catch((error) => console.log(error));
  }

  function handleNewMedication() {
    setShowCreateMedModal(true);
    resetModal();
  }

  function resetModal() {
    setShow(false);
    setInputText("");
    setMedications(null);
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
          <Form>
            <Form.Group controlId="searchMedication">
              <Form.Control
                type="text"
                placeholder="Enter the medication name"
                value={inputText}
                onChange={(e) => handleChange(e.target.value)}
              />
            </Form.Group>

            {medications
              ? medications.map((med) => {
                  return (
                    <Card key={med.id}>
                      <Card.Body
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Col>
                          <Card.Title>{med.name}</Card.Title>
                        </Col>

                        <Col
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                          }}
                        >
                          <Card.Subtitle
                            style={{ position: "absolute", left: "50%" }}
                          >
                            {med.strength}
                          </Card.Subtitle>

                          <Button
                            style={{ position: "absolute", right: 10 }}
                            onClick={() => handleAdd(med.id)}
                          >
                            Add
                          </Button>
                        </Col>
                      </Card.Body>
                    </Card>
                  );
                })
              : null}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <h4 style={{margin: 'auto'}}>Can't find it?</h4>
          <Container className="btn-container">
            <Button variant="outline-secondary" onClick={resetModal}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleNewMedication}>
              Click here to add a new one
            </Button>
          </Container>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SearchMedModal;
