import React, { useEffect, useState } from "react";
import { Row, Container, Button } from "react-bootstrap";

import axiosInstance from "../../util/axios";

import CreateMedModal from "./CreateMedModal";
import ManageMedicationModal from "./ManageMedicationModal";
import SingleMedication from "./SingleMedication";

function UsersMedications(props) {
  const usersMedications = props.usersMedications;
  const setUsersMedications = props.setUsersMedications;
  const setGetHistory = props.setGetHistory;

  const [showCreateMedModal, setShowCreateMedModal] = useState(false);
  const [showManageMedModal, setShowManageMedModal] = useState(false);

  function getUsersMedications() {
    axiosInstance
      .get("medications/medication_to_user/")
      .then((response) => {
        // console.log(response);
        if (response.data.length === 0) {
          setUsersMedications([{ id: "x" }]);
        } else {
          setUsersMedications(response.data);
        }
        setGetHistory(true);
      })
      // .catch((error) => console.log(error));
  }

  useEffect(() => {
    axiosInstance
      .get("medications/medication_to_user/")
      .then((response) => {
        // console.log(response);
        if (response.data.length === 0) {
          setUsersMedications([{ id: "x" }]);
        } else {
          setUsersMedications(response.data);
        }
        setGetHistory(true);
      })
      // .catch((error) => console.log(error));
  }, [setGetHistory, setUsersMedications]);

  // console.log(usersMedications);

  return usersMedications.length > 0 ? (
    <>
      <Row noGutters>
        {usersMedications[0].id !== "x" ? (
          usersMedications.map((med) => {
            return (
              <SingleMedication
                key={med.id}
                medication={med}
                addMedication={props.addMedication}
                resetSignal={props.resetSignal}
                setResetSignal={props.setResetSignal}
              />
            );
          })
        ) : (
          <>
            <h3>Welcome!</h3>
            <p>Add a medication below to get started.</p>
          </>
        )}
        {/* {usersMedications.map((med) => {
        return (
          <SingleMedication
            key={med.id}
            medication={med}
            addMedication={props.addMedication}
            resetSignal={props.resetSignal}
            setResetSignal={props.setResetSignal}
          />
        );
      })} */}
      </Row>

      <Container className="addMed-container">
        <Button
          variant="outline-danger"
          onClick={() => setShowCreateMedModal(true)}
        >
          Add Medication
        </Button>
        <Button
          variant="outline-dark"
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
  ) : null;
}

export default UsersMedications;
