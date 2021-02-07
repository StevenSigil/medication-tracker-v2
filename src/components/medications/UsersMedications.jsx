import React, { useState } from "react";
import { Row, Container, Button } from "react-bootstrap";
import axiosInstance from "../../util/axios";

import CreateMedModal from "./CreateMedModal";
import ManageMedicationModal from "./ManageMedicationModal";
import SingleMedication from "./SingleMedication";

function UsersMedications(props) {
  const usersMedications = props.usersMedications;
  const setUsersMedications = props.setUsersMedications;

  const [showCreateMedModal, setShowCreateMedModal] = useState(false);
  const [showManageMedModal, setShowManageMedModal] = useState(false);

  function getUsersMedications() {
    // Sets the medications on the users dashboard
    axiosInstance
      .get("medications/medication_to_user/")
      .then((response) => {
        console.log(response);
        if (response.data.length === 0) {
          setUsersMedications([{ id: "x" }]);
        } else {
          setUsersMedications(response.data);
        }
      })
      .catch((error) => console.log(error));

    return null;
  }

  return usersMedications.length > 0 ? (
    <>
      <Row noGutters>
        {usersMedications.map((med) => {
          return (
            <SingleMedication
              key={med.id}
              medication={med}
              addMedication={props.addMedication}
              resetSignal={props.resetSignal}
              setResetSignal={props.setResetSignal}
            />
          );
        })}
      </Row>

      <Container className="addMed-container">
        <Button
          variant="outline-danger"
          onClick={() => setShowCreateMedModal(true)}
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

      {/* POSSIBLE DEPRECATION 
      <SearchMedModal
        show={showSearchModal}
        setShow={setShowSearchModal}
        getUsersMedications={getUsersMedications}
        setShowCreateMedModal={setShowCreateMedModal}
      /> */}

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
  ) : (
    getUsersMedications()
  );
}

export default UsersMedications;
