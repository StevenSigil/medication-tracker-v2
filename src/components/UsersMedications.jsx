import React, { useState } from "react";
import { Row, Container, Button } from "react-bootstrap";

import axiosInstance from "../util/axios";

import CreateMedModal from "./CreateMedModal";
import SearchMedModal from "./SearchMedModal";
import SingleMedication from "./SingleMedication";

function UsersMedications(props) {
  const usersMedications = props.usersMedications;
  const setUsersMedications = props.setUsersMedications;

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showCreateMedModal, setShowCreateMedModal] = useState(false);

  function getUsersMedications() {
    // Sets the medications the user wants on the're dashboard
    axiosInstance
      .get("medications/medication_to_user/")
      .then((response) => {
        console.log(response);
        setUsersMedications(response.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <h4>Your medications</h4>
      <Row noGutters>
        {usersMedications.length !== 0
          ? usersMedications.map((med) => {
              return (
                <SingleMedication
                  key={med.id}
                  medication={med}
                  addMedication={props.addMedication}
                  setDisabledButton={props.setDisabledButton}
                  resetSignal={props.resetSignal}
                  setResetSignal={props.setResetSignal}
                />
              );
            })
          : getUsersMedications()}
      </Row>

      <Container className="addMed-container">
        <Button
          variant="outline-danger"
          onClick={() => setShowSearchModal(true)}
        >
          Add Medication
        </Button>
      </Container>

      <SearchMedModal
        show={showSearchModal}
        setShow={setShowSearchModal}
        getUsersMedications={getUsersMedications}
        setShowCreateMedModal={setShowCreateMedModal}
      />

      <CreateMedModal
        show={showCreateMedModal}
        setShow={setShowCreateMedModal}
        getUsersMedications={getUsersMedications}
      />
    </>
  );
}

export default UsersMedications;
