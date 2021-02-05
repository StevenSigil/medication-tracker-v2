import React, { useState } from "react";
import { Row, Container, Button } from "react-bootstrap";
import axiosInstance from "../util/axios";

import CreateMedModal from "./CreateMedModal";
import SearchMedModal from "./SearchMedModal";
import ManageMedicationModal from './ManageMedicationModal';
import SingleMedication from "./SingleMedication";

function UsersMedications(props) {
  const usersMedications = props.usersMedications;
  const setUsersMedications = props.setUsersMedications;

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showCreateMedModal, setShowCreateMedModal] = useState(false);
  const [showManageMedModal, setShowManageMedModal] = useState(false);

  function getUsersMedications() {
    // Sets the medications the user wants on the're dashboard
    axiosInstance
      .get("medications/medication_to_user/")
      .then((response) => {
        console.log(response);
        if (response.data.length === 0) {
          setUsersMedications([{ id: "x" }]);
        } else setUsersMedications(response.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
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
        <Button
          variant="outline-secondary"
          onClick={() => setShowManageMedModal(true)}
        >
          Manage medications
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

      <ManageMedicationModal
        usersMedications={usersMedications}
        show={showManageMedModal}
        setShow={setShowManageMedModal}
        getUsersMedications={getUsersMedications}
      />
    </>
  );
}

export default UsersMedications;
