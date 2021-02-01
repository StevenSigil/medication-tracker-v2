import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../public/css/main.css";

import CreateMedModal from "./CreateMedModal";
import SingleMedication from "./SingleMedication";

function Main() {
  const [showCreateMedModal, setShowCreateMedModal] = useState(false);

  const fake = [
    { id: 1, name: "Lisinopril" },
    { id: 2, name: "Atorvastatin" },
    { id: 3, name: "Levothyroxine" },
    { id: 4, name: "Metformin" },
    { id: 5, name: "Amlodipine" },
  ];

  return (
    <>
      <div className="main">
        <Container fluid className="main-head">
          <h1>The Drug Keep</h1>
        </Container>

        <Row className="main-row">
          <Col md={4}>
            <div>
              <Row noGutters>
                {fake.map((med) => {
                  return (
                    <SingleMedication key={med.id} medication={med.name} />
                  );
                })}
              </Row>

              <Container className='addMed-container'>
                <Button
                  variant="outline-danger"
                  onClick={() => setShowCreateMedModal(true)}
                >
                  Add Medication
                </Button>
              </Container>
            </div>
          </Col>

          <Col md={4}>
            <Container>
              <p>Inputs go here</p>

              <p>Other input underneath</p>
            </Container>
          </Col>

          <Col md={4}>
            <Container>
              <p>History log will go here</p>

              <Button variant="outline-danger">Download Data</Button>
            </Container>
          </Col>
        </Row>
      </div>

      <CreateMedModal
        show={showCreateMedModal}
        setShow={setShowCreateMedModal}
      />
    </>
  );
}

export default Main;
